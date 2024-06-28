/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import * as Yup from "yup";
import { Image } from "../../core/image";
import { RequestBase } from "../../core/request-base";
import { ImageFormat, ProcessingMode } from "../../core/types";
import { SingleImageSourceSchema } from "../../core/yup-common-schemas";

/**
 * The request class of ultra upscale action
 * @category Requests
 */
export class UltraUpscaleRequest extends RequestBase {
  /**
   * Source image.
   */
  image: Image | undefined;
  /**
   * Upscale an image with a given upscale factor.
   * The upscale factor increases the image’s resolution without increasing its size.
   * Upscale factor can be between 2 - 16 (default is 2)
   * Default is 2.
   */
  upscaleFactor: number | undefined;
  /**
   * Optionally select one of the image formats. Options are as follows:
   * Default is JPG.
   */
  format: ImageFormat | undefined;
  /**
   * Use this query parameter to establish the processing mode.
   * Acceptable values are sync, async and auto:
   * Default is sync.
   */
  mode: ProcessingMode | undefined;
  requestValidationSchema = Yup.object()
    .shape({
      image: Yup.mixed(),
      imageUrl: Yup.string(),
      imageId: Yup.string(),
      upscaleFactor: Yup.number().integer().min(2).max(16),
      format: Yup.string().oneOf(Object.values(ImageFormat)),
      mode: Yup.string().oneOf(Object.values(ProcessingMode)),
    })
    .concat(SingleImageSourceSchema);

  constructor() {
    super("POST", "/upscale/ultra");
  }

  /**
   * Setter for {@link UltraUpscaleRequest.image} property
   */
  setImage(image: Image): UltraUpscaleRequest {
    this.image = image;
    return this;
  }

  /**
   * Setter for {@link UltraUpscaleRequest.upscaleFactor} property
   */
  setUpscaleFactor(upscaleFactor: number): UltraUpscaleRequest {
    this.upscaleFactor = upscaleFactor;
    return this;
  }

  /**
   * Setter for {@link UltraUpscaleRequest.format} property
   */
  setFormat(format: ImageFormat): UltraUpscaleRequest {
    this.format = format;
    return this;
  }

  /**
   * Setter for {@link UltraUpscaleRequest.mode} property
   */
  setMode(mode: ProcessingMode): UltraUpscaleRequest {
    this.mode = mode;
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
