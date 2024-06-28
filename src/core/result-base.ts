/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { AxiosResponse } from "axios";
import { ResponseMeta } from "./response-meta";

/**
 * Abstract base class for results
 */
export abstract class ResultBase {
  /**
   * Metadata for the response
   */
  readonly metadata: ResponseMeta;

  protected constructor(response: AxiosResponse) {
    this.metadata = new ResponseMeta(response);
  }
}
