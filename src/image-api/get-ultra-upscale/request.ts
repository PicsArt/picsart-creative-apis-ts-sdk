/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { RequestBase } from "../../core/request-base";

/**
 * The request class of ultra upscale action. This is used for polling asynchronous result.
 * @category Requests
 */
export class GetUltraUpscaleRequest extends RequestBase {
  requestValidationSchema = undefined;

  /**
   * Transaction id returned from the first request
   */
  private readonly transactionId: string;

  constructor(transactionId: string) {
    super("GET", `/upscale/ultra/${transactionId}`);
    this.transactionId = transactionId;
  }

  /**
   * Custom logic for polling intervals
   */
  getPollingDelay(count: number = 1): number | null {
    const intervals = [20000, 10000, 10000];
    return intervals[count - 1] ?? null;
  }
}
