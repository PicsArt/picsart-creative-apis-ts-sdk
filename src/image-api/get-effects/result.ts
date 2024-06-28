/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { ResultBase } from "../../core/result-base";
import { AxiosResponse } from "axios";
import { EffectName } from "../../core/types";

/**
 * Class representing an Effect Item.
 */
class EffectItem {
  /**
   * Name of the effect
   */
  name: EffectName;

  constructor(item: EffectResponseItem) {
    this.name = item.name;
  }
}

/**
 * Interface representing the raw response for an effect item.
 */
interface EffectResponseItem {
  /**
   * Name of the effect returned by the response.
   */
  name: EffectName;
}

/**
 * Class representing the result of the GetEffects operation.
 * @category Results
 */
export class GetEffectsResult extends ResultBase {
  /**
   * An array of Effect items.
   */
  effects: EffectItem[];

  constructor(response: AxiosResponse) {
    super(response);
    this.effects = response.data.data.map((item: EffectResponseItem) => new EffectItem(item));
  }
}
