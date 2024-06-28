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
 * The request class of effect previews endpoint.
 * @category Requests
 */
export class EffectPreviewsRequest extends RequestBase {
  /**
   * Source image.
   */
  image: Image | undefined;
  /**
   * Select up to 10 effects to preview by holding down the Ctrl key.
   * The list of effects are as follows:
   * Default is apr1.
   */
  effectNames: Set<EffectName> = new Set<EffectName>();
  /**
   * Enter the width of the preview image. The max value is 240px.
   * The default is 120px.
   */
  previewSize: number | undefined;
  /**
   * Optionally select one of the image formats. Options are as follows:
   * Default is JPG.
   */
  format: ImageFormat | undefined;
  protected requestValidationSchema = Yup.object()
    .shape({
      image: Yup.mixed(),
      imageUrl: Yup.string(),
      imageId: Yup.string(),
      effectNames: Yup.array()
        .of(Yup.string().oneOf(Object.values(EffectName)))
        .min(1)
        .max(10)
        .required(),
      previewSize: Yup.number().integer().min(50).max(240),
      format: Yup.string().oneOf(Object.values(ImageFormat)),
    })
    .concat(SingleImageSourceSchema);

  constructor() {
    super("POST", "/effects/previews");
  }

  /**
   * Setter for {@link EffectPreviewsRequest.image} property
   */
  setImage(image: Image): EffectPreviewsRequest {
    this.image = image;
    return this;
  }

  /**
   * Setter for {@link EffectPreviewsRequest.effectNames} property
   */
  addEffect(effectName: EffectName): EffectPreviewsRequest {
    this.effectNames.add(effectName);
    return this;
  }

  /**
   * Setter for {@link EffectPreviewsRequest.previewSize} property
   */
  setPreviewSize(previewSize: number): EffectPreviewsRequest {
    this.previewSize = previewSize;
    return this;
  }

  /**
   * Setter for {@link EffectPreviewsRequest.format} property
   */
  setFormat(format: ImageFormat): EffectPreviewsRequest {
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
      ["effectNames", Array.from(this.effectNames)],
    ]);
  }
}
