/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import * as Yup from "yup";

import { Image } from "../../core/image";
import { RequestBase } from "../../core/request-base";
import { ImageFormat, TexturePattern } from "../../core/types";
import { SingleImageSourceSchema } from "../../core/yup-common-schemas";

/**
 * The request class of background texture endpoint.
 * @category Requests
 */
export class BackgroundTextureRequest extends RequestBase {
  /**
   * Source image.
   */
  image: Image | undefined;
  /**
   * Specify the width of the output image in pixels.
   * The default is 1024 and the maximum acceptable value is 8000.
   */
  width: number | undefined;
  /**
   * Specify the height of the output image in pixels.
   * The default is 1024 and the maximum acceptable value is 8000.
   */
  height: number | undefined;
  /**
   * Specify the pattern location, with x(width).
   * Calculation starts from the center of the image.
   * Default is 0.
   */
  offsetX: number | undefined;
  /**
   * Specify the pattern location, with y(height).
   * Calculation starts from the center of the image.
   * Default is 0.
   */
  offsetY: number | undefined;
  /**
   * Choose a pattern for the background texture.
   * Default is hex.
   */
  pattern: TexturePattern | undefined;
  /**
   * Enter an integer value to rotate the texture pattern from -180 to +180.
   * Default is 0.
   */
  rotate: number | undefined;
  /**
   * Enter a floating point number between 0.5 - 10.0 to scale the background texture.
   * Default is 1.0.
   */
  scale: number | undefined;
  /**
   * Optionally select one of the image formats (JPG is chosen if left blank). Options are as follows.
   * Default is JPG.
   */
  format: ImageFormat | undefined;
  protected requestValidationSchema = Yup.object()
    .shape({
      image: Yup.mixed(),
      imageUrl: Yup.string(),
      imageId: Yup.string(),
      width: Yup.number().integer().min(-100).max(8000),
      height: Yup.number().integer().min(-100).max(8000),
      offsetX: Yup.number().integer().min(50).max(5000),
      offsetY: Yup.number().integer().min(50).max(5000),
      pattern: Yup.string().oneOf(Object.values(TexturePattern)),
      rotate: Yup.number().integer().min(-180).max(180),
      scale: Yup.number().integer().min(0.5).max(10),
      format: Yup.string().oneOf(Object.values(ImageFormat)),
    })
    .concat(SingleImageSourceSchema);

  constructor() {
    super("POST", "/background/texture");
  }

  /**
   * Setter for {@link BackgroundTextureRequest.image} property
   */
  setImage(image: Image): BackgroundTextureRequest {
    this.image = image;
    return this;
  }

  /**
   * Setter for {@link BackgroundTextureRequest.width} property
   */
  setWidth(width: number): BackgroundTextureRequest {
    this.width = width;
    return this;
  }

  /**
   * Setter for {@link BackgroundTextureRequest.height} property
   */
  setHeight(height: number): BackgroundTextureRequest {
    this.height = height;
    return this;
  }

  /**
   * Setter for {@link BackgroundTextureRequest.offsetX} property
   */
  setOffsetX(offsetX: number): BackgroundTextureRequest {
    this.offsetX = offsetX;
    return this;
  }

  /**
   * Setter for {@link BackgroundTextureRequest.offsetY} property
   */
  setOffsetY(offsetY: number): BackgroundTextureRequest {
    this.offsetY = offsetY;
    return this;
  }

  /**
   * Setter for {@link BackgroundTextureRequest.pattern} property
   */
  setPattern(pattern: TexturePattern): BackgroundTextureRequest {
    this.pattern = pattern;
    return this;
  }

  /**
   * Setter for {@link BackgroundTextureRequest.rotate} property
   */
  setRotate(rotate: number): BackgroundTextureRequest {
    this.rotate = rotate;
    return this;
  }

  /**
   * Setter for {@link BackgroundTextureRequest.scale} property
   */
  setScale(scale: number): BackgroundTextureRequest {
    this.scale = scale;
    return this;
  }

  /**
   * Setter for {@link BackgroundTextureRequest.format} property
   */
  setFormat(format: ImageFormat): BackgroundTextureRequest {
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
