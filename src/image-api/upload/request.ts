/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import * as Yup from "yup";

import { Image } from "../../core/image";
import { RequestBase } from "../../core/request-base";
import { SingleImageSourceUploadSchema } from "../../core/yup-common-schemas";

/**
 * The request class of upload endpoint.
 * @category Requests
 */
export class UploadRequest extends RequestBase {
  /**
   * Source image.
   */
  image: Image | undefined;
  protected requestValidationSchema = Yup.object()
    .shape({
      image: Yup.mixed(),
      imageUrl: Yup.string(),
    })
    .concat(SingleImageSourceUploadSchema);

  constructor() {
    super("POST", "/upload");
  }

  /**
   * Setter for {@link UploadRequest.image} property
   */
  setImage(image: Image): UploadRequest {
    this.image = image;
    return this;
  }

  /**
   * Fields custom mapping definition. This is used for generating axios requests.
   */
  protected getMappedValue(field: string) {
    return super.getMappedValue(field, [
      ["image", this.image?.data],
      ["imageUrl", this.image?.url],
    ]);
  }
}
