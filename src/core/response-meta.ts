/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { AxiosResponse } from "axios";

/**
 * This class is used to wrap the meta-data from an Axios response.
 */
export class ResponseMeta {
  /** The number of credits available */
  readonly creditsAvailable: number;

  /** The time at which the rate limit will reset */
  readonly rateLimitResetTime: number;

  /** The rate limit */
  readonly rateLimit: number;

  /** The number of requests remaining for the rate limit */
  readonly rateLimitAvailable: number;

  /** The correlation id from the response headers */
  readonly correlationId: number;

  constructor(response: AxiosResponse) {
    this.correlationId = response.headers["x-picsart-correlation-id"];
    this.rateLimitAvailable = parseInt(response.headers["x-picsart-ratelimit-available"]);
    this.rateLimit = parseInt(response.headers["x-picsart-ratelimit-limit"]);
    this.rateLimitResetTime = parseInt(response.headers["x-picsart-ratelimit-reset-time"]);
    this.creditsAvailable = parseInt(response.headers["x-picsart-credit-available"]);
  }
}
