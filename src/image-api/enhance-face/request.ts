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
 * The request class for enhance face action.
 * @category Requests
 */
export class EnhanceFaceRequest extends RequestBase {
  /**
   * Source image.
   */
  image: Image | undefined;
  /**
   * Optionally select one of the image formats (JPG is the default). Options are as follows:
   * Default is JPG.
   */
  format: ImageFormat | undefined;
  protected requestValidationSchema = Yup.object()
    .shape({
      image: Yup.mixed(),
      imageUrl: Yup.string(),
      imageId: Yup.string(),
      format: Yup.string().oneOf(Object.values(ImageFormat)),
    })
    .concat(SingleImageSourceSchema);

  constructor() {
    super("POST", "/enhance/face");
  }

  /**
   * Setter for {@link EnhanceFaceRequest.image} property
   */
  setImage(image: Image): EnhanceFaceRequest {
    this.image = image;
    return this;
  }

  /**
   * Setter for {@link EnhanceFaceRequest.format} property
   */
  setFormat(format: ImageFormat): EnhanceFaceRequest {
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
