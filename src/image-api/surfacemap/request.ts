/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import * as Yup from "yup";
import { Image } from "../../core/image";
import { RequestBase } from "../../core/request-base";
import { ImageFormat } from "../../core/types";
import {
  SingleImageSourceSchema,
  SingleMaskImageSourceSchema,
  SingleStickerImageSourceSchema,
} from "../../core/yup-common-schemas";

/**
 * The request class for the surfacemap action.
 * @category Requests
 */
export class SurfacemapRequest extends RequestBase {
  /**
   * Source image.
   */
  image: Image | undefined;
  /**
   * Source mask file (binary).
   * If this parameter is present, the other mask source parameters must be empty.
   */
  mask: Image | undefined;
  /**
   * Source sticker file (binary).
   * If this parameter is present, the other sticker source parameters must be empty.
   */
  sticker: Image | undefined;
  /**
   * Optionally select one of the image formats (JPG is chosen if left blank). Options are as follows:
   * Default is JPG.
   */
  format: ImageFormat | undefined;
  protected requestValidationSchema = Yup.object()
    .shape({
      image: Yup.mixed(),
      imageUrl: Yup.string(),
      imageId: Yup.string(),
      mask: Yup.mixed(),
      maskUrl: Yup.string(),
      maskId: Yup.string(),
      sticker: Yup.mixed(),
      stickerUrl: Yup.string(),
      stickerId: Yup.string(),
      format: Yup.string().oneOf(Object.values(ImageFormat)),
    })
    .concat(SingleImageSourceSchema)
    .concat(SingleMaskImageSourceSchema)
    .concat(SingleStickerImageSourceSchema);

  constructor() {
    super("POST", "/surfacemap");
  }

  /**
   * Setter for {@link SurfacemapRequest.image} property
   */
  setImage(image: Image): SurfacemapRequest {
    this.image = image;
    return this;
  }

  /**
   * Setter for {@link SurfacemapRequest.mask} property
   */
  setMask(mask: Image): SurfacemapRequest {
    this.mask = mask;
    return this;
  }

  /**
   * Setter for {@link SurfacemapRequest.sticker} property
   */
  setSticker(sticker: Image): SurfacemapRequest {
    this.sticker = sticker;
    return this;
  }

  /**
   * Setter for {@link SurfacemapRequest.format} property
   */
  setFormat(format: ImageFormat): SurfacemapRequest {
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
      ["mask", this.mask?.data],
      ["maskUrl", this.mask?.url],
      ["maskId", this.mask?.url ? undefined : this.mask?.id],
      ["sticker", this.sticker?.data],
      ["stickerUrl", this.sticker?.url],
      ["stickerId", this.sticker?.url ? undefined : this.sticker?.id],
    ]);
  }
}
