/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { ResultBase } from "../../core/result-base";
import { AxiosResponse } from "axios";

/**
 * The result class of get balance action
 * @category Results
 */
export class GetBalanceResult extends ResultBase {
  /**
   * Amount of credits available for current API Key.
   */
  credits: number;

  constructor(response: AxiosResponse) {
    super(response);
    this.credits = response.data.credits;
  }
}
