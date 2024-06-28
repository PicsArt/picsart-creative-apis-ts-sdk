/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { ResultBase } from "../../core/result-base";
import { AxiosResponse } from "axios";
import { EffectName } from "../../core/types";

/**
 * Interface for response data item.
 */
interface EffectPreviewsResponseItem {
  /**
   * The ID of the image.
   */
  id: string;

  /**
   * The URL of the image.
   */
  url: string;

  /**
   * The name of the effect.
   */
  effect_name: string;
}

/**
 * Class representing an effect preview item.
 */
class EffectPreviewItem {
  /**
   * The ID of the image.
   */
  id: string;

  /**
   * The URL of the image.
   */
  url: string;

  /**
   * The name of the effect.
   */
  effectName: EffectName;

  constructor(item: EffectPreviewsResponseItem) {
    this.id = item.id;
    this.url = item.url;
    this.effectName = item.effect_name as EffectName;
  }
}

/**
 * Class representing the result of an effect preview action.
 * @category Results
 */
export class EffectPreviewsResult extends ResultBase {
  /**
   * The array of thumbnails, each represented by an EffectPreviewItem.
   */
  public readonly thumbnails: EffectPreviewItem[];

  constructor(response: AxiosResponse) {
    super(response);
    this.thumbnails = response.data.data.map((item: EffectPreviewsResponseItem) => new EffectPreviewItem(item));
  }
}
