/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { RequestBase } from "../../core/request-base";

/**
 * The request class of getting list of effects
 * @category Requests
 */
export class GetEffectsRequest extends RequestBase {
  requestValidationSchema = undefined;

  constructor() {
    super("GET", "/effects");
  }
}
