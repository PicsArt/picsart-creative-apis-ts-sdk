/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import * as Yup from "yup";
import { Image } from "../../core/image";
import { RequestBase } from "../../core/request-base";
import { ImageFormat, UpscaleFactor } from "../../core/types";
import { SingleImageSourceSchema } from "../../core/yup-common-schemas";

/**
 * The request class of upscale action.
 * @category Requests
 */
export class UpscaleRequest extends RequestBase {
  /**
   * Source image.
   */
  image: Image | undefined;
  /**
   * Choose one of the upscale factors. The option are as follows:
   * Default is 2.
   */
  upscaleFactor: UpscaleFactor | undefined;
  /**
   * Optionally select one of the output image formats (JPG is chosen if left blank). Options are as follows:
   * Default is JPG.
   */
  format: ImageFormat | undefined;
  protected requestValidationSchema = Yup.object()
    .shape({
      image: Yup.mixed(),
      imageUrl: Yup.string(),
      imageId: Yup.string(),
      upscaleFactor: Yup.string().oneOf(Object.values(UpscaleFactor)).required(),
      format: Yup.string().oneOf(Object.values(ImageFormat)),
    })
    .concat(SingleImageSourceSchema);

  constructor() {
    super("POST", "/upscale");
  }

  /**
   * Setter for {@link UpscaleRequest.image} property
   */
  setImage(image: Image): UpscaleRequest {
    this.image = image;
    return this;
  }

  /**
   * Setter for {@link UpscaleRequest.upscaleFactor} property
   */
  setUpscaleFactor(upscaleFactor: UpscaleFactor): UpscaleRequest {
    this.upscaleFactor = upscaleFactor;
    return this;
  }

  /**
   * Setter for {@link UpscaleRequest.format} property
   */
  setFormat(format: ImageFormat): UpscaleRequest {
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
