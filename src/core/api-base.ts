/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestBase } from "./request-base";
import {
  BadRequestError,
  ForbiddenError,
  GeneralError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  RequestEntityTooLargeError,
  RequestHeaderFieldsTooLargeError,
  ServiceUnavailableError,
  TooManyRequestsError,
  UnauthorizedError,
  UnsupportedMediaTypeError,
} from "./errors";
import { ApiClientOptions, ExecuteOptions } from "./types";
import { delay, randomInteger } from "./utils";
import axiosRetry, { IAxiosRetryConfigExtended } from "axios-retry";
import { ResponseMeta } from "./response-meta";
import { PACKAGE_NAME, PACKAGE_VERSION } from "./config";

/**
 * This class is used as a parent class for API classes such as GenaiApi or ImageApi.
 * It contains the main logic of making requests to server, polling, error handling etc.
 * @internal
 *  */
export class ApiBase {
  /*
   * Base URL of the API server
   */
  private readonly baseUrl: string;

  /*
   * Picsart API Key
   */
  private readonly apiKey: string;

  /*
   * Axios instance that is used for current API
   */
  private readonly axiosInstance: AxiosInstance = axios.create();

  constructor(apiKey: string, options: ApiClientOptions) {
    this.apiKey = apiKey;
    this.baseUrl = options.baseUrl;
  }

  /*
   * This method is returning retying configuration specific to the request.
   * Amount of retries is provided by a user.
   * Delay is exponential by default but can be overwritten by a user.
   * In case of rate limit exception delay will be calculated based on delay time
   */
  private getRetryingConfigForRequest(request: RequestBase): IAxiosRetryConfigExtended | undefined {
    if (!request.retries || request.retries < 0) {
      return;
    }

    return {
      retries: request.retries,
      retryDelay: (retryCount: number, error: AxiosError) => {
        if (error.response?.status === 429) {
          const meta = new ResponseMeta(error.response);
          return meta.rateLimitResetTime * 1000 + randomInteger(1000, 2000);
        }
        return request.retryDelay ?? axiosRetry.exponentialDelay(retryCount, error);
      },
    };
  }

  /**
   * This is the main method that makes API requests to the server.
   * @param {R extends RequestBase} request - Request instance
   * @param {ExecuteOptions} options - Additional options
   * @internal
   */
  protected async execute<R extends RequestBase>(request: R, options?: ExecuteOptions): Promise<AxiosResponse> {
    try {
      const config = await request.buildAxiosRequestConfig(options);

      const requestConfig: AxiosRequestConfig = {
        ...config,
        url: `${this.baseUrl}${config.url}`,
        headers: {
          accept: "application/json",
          "content-type": options?.jsonPayload ? "application/json" : "multipart/form-data",
          "X-Picsart-API-Key": this.apiKey,
          "User-Agent": `${PACKAGE_NAME}:${PACKAGE_VERSION}`,
        },
      };
      const retryConfig = this.getRetryingConfigForRequest(request);
      if (retryConfig) {
        requestConfig["axios-retry"] = retryConfig;
      }

      return await this.axiosInstance.request(requestConfig);
    } catch (err: unknown) {
      const error = err as AxiosError;

      const errorDetail = (error?.response?.data as any)?.detail;

      switch (error?.response?.status) {
        case 400:
        case 422:
          throw new BadRequestError(request, error.message, errorDetail);
        case 401:
          throw new UnauthorizedError(request, error.message, errorDetail);
        case 403:
          throw new ForbiddenError(request, error.message, errorDetail);
        case 404:
          throw new NotFoundError(request, error.message, errorDetail);
        case 405:
          throw new MethodNotAllowedError(request, error.message, errorDetail);
        case 413:
          throw new RequestEntityTooLargeError(request, error.message, errorDetail);
        case 415:
          throw new UnsupportedMediaTypeError(request, error.message, errorDetail);
        case 429:
          throw new TooManyRequestsError(request, error.message, errorDetail);
        case 431:
          throw new RequestHeaderFieldsTooLargeError(request, error.message, errorDetail);
        case 500:
          throw new InternalServerError(request, error.message, errorDetail);
        case 503:
          throw new ServiceUnavailableError(request, error.message, errorDetail);
        default:
          throw error;
      }
    }
  }

  /**
   * This is an internal method that is used for polling asynchronous endpoints.
   * @param {R extends RequestBase} request - Request instance
   * @param {number} count - Amount of tries
   * @param {ExecuteOptions} options - Additional options
   * @internal
   */
  protected async executePolling<R extends RequestBase>(
    request: R,
    count = 1,
    options?: ExecuteOptions
  ): Promise<AxiosResponse> {
    const response = await this.execute<R>(request, options);
    if (response.status === 202) {
      const interval = request.getPollingDelay(count);
      if (interval === null) {
        throw new GeneralError(request, "Polling failed. Too many tries.");
      }
      await delay(interval);
      return this.executePolling(request, count + 1);
    }
    return response;
  }
}
