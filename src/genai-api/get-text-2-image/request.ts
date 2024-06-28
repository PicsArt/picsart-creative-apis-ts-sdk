/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { RequestBase } from "../../core/request-base";

/**
 * The request class of text to image action. This request is used to get asynchronous result.
 * @category Requests
 */
export class GetText2ImageRequest extends RequestBase {
  requestValidationSchema = undefined;
  private readonly inferenceId: string;

  constructor(inferenceId: string) {
    super("GET", `/text2image/inferences/${inferenceId}`);
    this.inferenceId = inferenceId;
  }

  /*
   * Overwrites default delay of polling with custom logic
   */
  getPollingDelay(count: number = 1): number | null {
    const intervals = [1000, 1000, 1000];
    return intervals[count - 1] ?? null;
  }
}
