/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { RequestBase } from "../../core/request-base";

/**
 * The request class for get balance action
 * @category Requests
 */
export class GetBalanceRequest extends RequestBase {
  requestValidationSchema = undefined;

  constructor() {
    super("GET", "/balance");
  }
}
