/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { AxiosRequestConfig, Method } from "axios";
import FormData from "form-data";
import * as Yup from "yup";
import { ValidationError } from "./errors";
import { ExecuteOptions } from "./types";
import { camelToSnakeCase } from "./utils";

/**
 * A base class for all the requests. Provides methods for setting up and validating requests.
 */
export class RequestBase {
  /*
   * The HTTP request method
   */
  protected readonly method: Method;
  /*
   * The API path for the request
   */
  protected readonly path: string;

  /*
   * Validation schema of the request parameters
   */
  protected requestValidationSchema: Yup.Schema | undefined;

  protected constructor(method: Method, path: string) {
    this.method = method;
    this.path = path;
  }

  /**
   * This method is used to build the configuration needed for axios request.
   * @param {ExecuteOptions} options - Additional options for request
   * @returns {Promise<AxiosRequestConfig>} Returns the configuration for axios request as a Promise.
   */
  async buildAxiosRequestConfig(options?: ExecuteOptions): Promise<AxiosRequestConfig> {
    if (!this.requestValidationSchema) {
      return {
        url: this.path,
        method: this.method,
      };
    }

    const schemaObjectDescription = this.requestValidationSchema.describe() as Yup.SchemaObjectDescription;
    const [formData, data, payload] = Object.keys(schemaObjectDescription.fields).reduce(
      (acc, field) => {
        const key = field as keyof RequestBase;
        const { mapped, value: mappedValue } = this.getMappedValue(key);

        const value =
          mapped && mappedValue !== undefined ? mappedValue : !mapped && this[key] != undefined ? this[key] : undefined;

        const camelCaseField = camelToSnakeCase(key);
        if (value instanceof Buffer) {
          acc[0].append(camelCaseField, value, "image");
        } else if (Array.isArray(value)) {
          acc[0].append(camelCaseField, value.join(","));
        } else if (value != undefined) {
          acc[0].append(camelCaseField, value as any);
        }

        if (value != undefined) {
          acc[1][key] = value;
          acc[2][camelCaseField] = value;
        }

        return acc;
      },
      [new FormData(), {} as any, {} as any]
    );

    this.validate(data);

    return {
      url: this.path,
      method: this.method,
      data: this.method !== "GET" ? (options?.jsonPayload ? payload : formData) : undefined,
    };
  }

  /**
   * This method maps the field to its value. It's provided as an utility method for transformations.
   * @param field - The field name to be mapped
   * @param mappings - Array of mappings
   * @returns Returns whether the field was mapped and its value.
   * @internal
   */
  protected getMappedValue(field: string, mappings: any[] = []) {
    const mapping = new Map(mappings);
    return { mapped: mapping.has(field), value: mapping.get(field) };
  }

  /**
   * This method validates the payload according to the request validation schema.
   * @param payload - The payload to be validated
   * @throws Will throw an error if the payload doesn't match the schema.
   * @internal
   */
  protected validate(payload: object): void | never {
    try {
      this.requestValidationSchema?.validateSync(payload, { abortEarly: false });
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        throw new ValidationError(this, err.message, err.errors);
      }
      throw err;
    }
  }

  retries: number | undefined = 0;

  /**
   * Setter for the retry property.
   * @param retries - The number of retries for the request
   * @returns Returns the context for chaining
   */
  setRetries(retries: number): typeof this {
    this.retries = retries;
    return this;
  }

  retryDelay: number | undefined;

  /**
   * Setter for the retryDelay property.
   * @param retryDelay - The delay between retries
   * @returns Returns the context for chaining
   */
  setRetryDelay(retryDelay: number): typeof this {
    this.retryDelay = retryDelay;
    return this;
  }

  /**
   * Computes the delay for polling.
   * @param count - The count for which delay is to be computed
   * @returns Returns the delay for polling.
   */
  getPollingDelay(count: number = 1): number | null {
    return 1000 + count;
  }
}
