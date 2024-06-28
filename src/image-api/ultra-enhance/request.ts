/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import * as Yup from "yup";
import { Image } from "../../core/image";
import { RequestBase } from "../../core/request-base";
import { ImageFormat } from "../../core/types";
import { SingleImageSourceSchema } from "../../core/yup-common-schemas";

/**
 * The request class of the ultra enhance action
 * @category Requests
 */
export class UltraEnhanceRequest extends RequestBase {
  /**
   * Source image.
   */
  image: Image | undefined;
  /**
   * Upscale an image with a given upscale factor.
   * The upscale factor increases the image’s resolution without increasing its size.
   * Upscale factor can be between 2 - 16
   * Default is 2.
   */
  upscaleFactor: number | undefined;
  /**
   * Optionally select one of the image formats (JPG is chosen if left blank).
   * Options are as follows:
   * Default is JPG.
   */
  format: ImageFormat | undefined;
  protected requestValidationSchema = Yup.object()
    .shape({
      image: Yup.mixed(),
      imageUrl: Yup.string(),
      imageId: Yup.string(),
      upscaleFactor: Yup.number().integer().min(2).max(16),
      format: Yup.string().oneOf(Object.values(ImageFormat)),
    })
    .concat(SingleImageSourceSchema);

  constructor() {
    super("POST", "/upscale/enhance");
  }

  /**
   * Setter for {@link UltraEnhanceRequest.image} property
   */
  setImage(image: Image): UltraEnhanceRequest {
    this.image = image;
    return this;
  }

  /**
   * Setter for {@link UltraEnhanceRequest.upscaleFactor} property
   */
  setUpscaleFactor(upscaleFactor: number): UltraEnhanceRequest {
    this.upscaleFactor = upscaleFactor;
    return this;
  }

  /**
   * Setter for {@link UltraEnhanceRequest.format} property
   */
  setFormat(format: ImageFormat): UltraEnhanceRequest {
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
