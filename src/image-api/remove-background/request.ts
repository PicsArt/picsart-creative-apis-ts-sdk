/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import * as Yup from "yup";
import { Image } from "../../core/image";
import { RequestBase } from "../../core/request-base";
import { ImageFormat, ImageScale, OutputType } from "../../core/types";
import { SingleBgImageOptionalSchema, SingleImageSourceSchema } from "../../core/yup-common-schemas";

/**
 * The request class for remove background action.
 * @category Requests
 */
export class RemoveBackgroundRequest extends RequestBase {
  /**
   * Source image.
   */
  image: Image | undefined;
  /**
   * Source image of background.
   * This only has an effect when output=cutout.
   */
  bgImage: Image | undefined;
  /**
   * Select one of the two output options.
   * If you submit a photo of a person,
   * cutout returns the person as a sticker while mask returns a mask photo of the person.
   */
  outputType: OutputType | undefined;
  /**
   * Can be a hexcolor code (e.g., #82d5fa, #fff) or a color name (e.g., blue).
   * For semi-transparency, 4-/8-digit hexcodes are also supported (e.g., #18d4ff87).
   * If this parameter is present, the other bg_ parameters must be empty.
   */
  bgColor: string | undefined;
  /**
   * Enter an integer value from 0 to +100.
   */
  bgBlur: number | undefined;
  /**
   * Size, in pixels, for the width. If left blank, the background is left at its original width.
   */
  bgWidth: number | undefined;
  /**
   * Size, in pixels, for the height. If left blank, the background is left at its original height.
   */
  bgHeight: number | undefined;
  /**
   * Fit is where the longer side (width/height) fits the background.
   * Fill is where the shorter side fits the background. Fit is the default.
   */
  scale: ImageScale | undefined;
  /**
   * Automatically center the object. Works only, when output_type=cutout.
   * We don't recommend using this flag when the object is visible only partially
   * (e.g. half-cup or half-shoe is in the image).
   */
  autoCenter: boolean | undefined;
  /**
   * Add a solid stroke (border) around the cutout result. Works when output_type=cutout.
   * Set 0 to remove. Takes values from 0 to 100.
   */
  strokeSize: number | undefined;
  /**
   * Define the color of the stroke.
   * Can be a hexcolor code (e.g., #82d5fa, #fff; with or without #) or a color name (e.g., blue; in English).
   * For semi-transparency, 4-/8-digit hexcodes are also supported (e.g., #18d4ff87).
   * Gets applied if the stroke_size is 1 and above.
   */
  strokeColor: string | undefined;
  /**
   * Define the opacitiy of the stroke added to the cutout result.
   * Works when output_type=cutout and stroke_size is 1 and above.
   * Takes values from 0 to 100. Default is 100 (opaque). Set to 0 to make it transparent.
   */
  strokeOpacity: number | undefined;
  /**
   * Optionally select one of the image formats (PNG is chosen if left blank). Options are as follows:
   * Default is JPG.
   */
  format: ImageFormat | undefined;
  requestValidationSchema = Yup.object()
    .shape({
      image: Yup.mixed(),
      imageUrl: Yup.string(),
      imageId: Yup.string(),
      outputType: Yup.string().oneOf(Object.values(OutputType)),
      bgImage: Yup.mixed(),
      bgImageUrl: Yup.string(),
      bgImageId: Yup.string(),
      bgColor: Yup.string(),
      bgBlur: Yup.number().integer().min(0).max(100),
      bgWidth: Yup.number().integer().min(50).max(5000),
      bgHeight: Yup.number().integer().min(50).max(5000),
      scale: Yup.string().oneOf(Object.values(ImageScale)),
      autoCenter: Yup.boolean(),
      strokeSize: Yup.number().integer().min(0).max(100),
      strokeColor: Yup.string(),
      strokeOpacity: Yup.number().integer().min(0).max(100),
      format: Yup.string().oneOf(Object.values(ImageFormat)),
    })
    .concat(SingleImageSourceSchema)
    .concat(SingleBgImageOptionalSchema);

  constructor() {
    super("POST", "/removebg");
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.image} property
   */
  setImage(image: Image): RemoveBackgroundRequest {
    this.image = image;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.bgImage} property
   */
  setBgImage(bgImage: Image): RemoveBackgroundRequest {
    this.bgImage = bgImage;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.outputType} property
   */
  setOutputType(outputType: OutputType): RemoveBackgroundRequest {
    this.outputType = outputType;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.bgColor} property
   */
  setBgColor(bgColor: string): RemoveBackgroundRequest {
    this.bgColor = bgColor;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.bgBlur} property
   */
  setBgBlur(bgBlur: number): RemoveBackgroundRequest {
    this.bgBlur = bgBlur;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.bgWidth} property
   */
  setBgWidth(bgWidth: number): RemoveBackgroundRequest {
    this.bgWidth = bgWidth;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.bgHeight} property
   */
  setBgHeight(bgHeight: number): RemoveBackgroundRequest {
    this.bgHeight = bgHeight;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.scale} property
   */
  setScale(scale: ImageScale): RemoveBackgroundRequest {
    this.scale = scale;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.autoCenter} property
   */
  setAutoCenter(autoCenter: boolean): RemoveBackgroundRequest {
    this.autoCenter = autoCenter;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.strokeSize} property
   */
  setStrokeSize(strokeSize: number): RemoveBackgroundRequest {
    this.strokeSize = strokeSize;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.strokeColor} property
   */
  setStrokeColor(strokeColor: string): RemoveBackgroundRequest {
    this.strokeColor = strokeColor;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.strokeOpacity} property
   */
  setStrokeOpacity(strokeOpacity: number): RemoveBackgroundRequest {
    this.strokeOpacity = strokeOpacity;
    return this;
  }

  /**
   * Setter for {@link RemoveBackgroundRequest.format} property
   */
  setFormat(format: ImageFormat): RemoveBackgroundRequest {
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

      ["bgImage", this.bgImage?.data],
      ["bgImageUrl", this.bgImage?.url],
      ["bgImageId", this.bgImage?.url ? undefined : this.bgImage?.id],
    ]);
  }
}
