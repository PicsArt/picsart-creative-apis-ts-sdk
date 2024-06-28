/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import * as Yup from "yup";
import { Image } from "../../core/image";
import { RequestBase } from "../../core/request-base";
import { EffectName, ImageFormat } from "../../core/types";
import { SingleImageSourceSchema } from "../../core/yup-common-schemas";

/**
 * The request class of effect action.
 * @category Requests
 */
export class EffectRequest extends RequestBase {
  /**
   * Source image.
   */
  image: Image | undefined;
  /**
   * Choose an effect from the dropdown menu. The list of effects are as follows.
   */
  effectName: string | undefined;
  /**
   * Optionally select one of the output image formats (JPG is chosen if left blank). Options are as follows.
   * Default is JPG.
   */
  format: ImageFormat | undefined;
  protected requestValidationSchema = Yup.object({
    image: Yup.mixed(),
    imageUrl: Yup.string(),
    imageId: Yup.string(),
    effectName: Yup.string().oneOf(Object.values(EffectName)).required(),
    format: Yup.string().oneOf(Object.values(ImageFormat)),
  }).concat(SingleImageSourceSchema);

  constructor() {
    super("POST", "/effects");
  }

  /**
   * Setter for {@link EffectRequest.image} property
   */
  setImage(image: Image): EffectRequest {
    this.image = image;
    return this;
  }

  /**
   * Setter for {@link EffectRequest.effectName} property
   */
  setEffectName(effectName: EffectName): EffectRequest {
    this.effectName = effectName;
    return this;
  }

  /**
   * Setter for {@link EffectRequest.format} property
   */
  setFormat(format: ImageFormat): EffectRequest {
    this.format = format;
    return this;
  }

  /**
   * Fields custom mapping definition. This is used for generating axios requests.
   */
  protected getMappedValue(field: string) {
    return super.getMappedValue(field, [
      ["image", this.image?.data],
      ["imageUrl", this.image?.url],
      ["imageId", this.image?.url ? undefined : this.image?.id],
    ]);
  }
}
