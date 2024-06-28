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
 * The request class for adjust action.
 * @category Requests
 */
export class AdjustRequest extends RequestBase {
  /**
   * Source image.
   */
  image: Image | undefined;
  /**
   * Enter an integer value from -100 to +100.
   */
  brightness: number | undefined;
  /**
   * Enter an integer value from -100 to +100.
   */
  contrast: number | undefined;
  /**
   * Enter an integer value from -100 to +100.
   */
  clarity: number | undefined;
  /**
   * Enter an integer value from -100 to +100.
   */
  saturation: number | undefined;
  /**
   * Enter an integer value from -100 to +100.
   */
  hue: number | undefined;
  /**
   * Enter an integer value from -100 to +100.
   */
  shadows: number | undefined;
  /**
   * Enter an integer value from -100 to +100.
   */
  highlights: number | undefined;
  /**
   * Enter an integer value from -100 to +100.
   */
  temperature: number | undefined;
  /**
   * Enter an integer value from 0 to +100.
   */
  sharpen: number | undefined;
  /**
   * Enter an integer value from 0 to +100.
   */
  noise: number | undefined;
  /**
   * Enter an integer value from 0 to +100.
   */
  vignette: number | undefined;
  /**
   * Optionally select one of the image formats. Options are as follows.
   * Default is JPG.
   */
  format: ImageFormat | undefined;
  protected requestValidationSchema = Yup.object()
    .shape({
      image: Yup.mixed(),
      imageUrl: Yup.string(),
      imageId: Yup.string(),
      brightness: Yup.number().integer().min(-100).max(100),
      contrast: Yup.number().integer().min(-100).max(100),
      clarity: Yup.number().integer().min(-100).max(100),
      saturation: Yup.number().integer().min(-100).max(100),
      hue: Yup.number().integer().min(-100).max(100),
      shadows: Yup.number().integer().min(-100).max(100),
      highlights: Yup.number().integer().min(-100).max(100),
      temperature: Yup.number().integer().min(-100).max(100),
      sharpen: Yup.number().integer().min(0).max(100),
      noise: Yup.number().integer().min(0).max(100),
      vignette: Yup.number().integer().min(0).max(100),
      format: Yup.string().oneOf(Object.values(ImageFormat)),
    })
    .concat(SingleImageSourceSchema);

  constructor() {
    super("POST", "/adjust");
  }

  /**
   * Setter for {@link AdjustRequest.image} property
   */
  setImage(image: Image): AdjustRequest {
    this.image = image;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.brightness} property
   */
  setBrightness(brightness: number): AdjustRequest {
    this.brightness = brightness;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.contrast} property
   */
  setContrast(contrast: number): AdjustRequest {
    this.contrast = contrast;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.clarity} property
   */
  setClarity(clarity: number): AdjustRequest {
    this.clarity = clarity;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.saturation} property
   */
  setSaturation(saturation: number): AdjustRequest {
    this.saturation = saturation;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.hue} property
   */
  setHue(hue: number): AdjustRequest {
    this.hue = hue;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.shadows} property
   */
  setShadows(shadows: number): AdjustRequest {
    this.shadows = shadows;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.highlights} property
   */
  setHighlights(highlights: number): AdjustRequest {
    this.highlights = highlights;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.temperature} property
   */
  setTemperature(temperature: number): AdjustRequest {
    this.temperature = temperature;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.sharpen} property
   */
  setSharpen(sharpen: number): AdjustRequest {
    this.sharpen = sharpen;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.noise} property
   */
  setNoise(noise: number): AdjustRequest {
    this.noise = noise;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.vignette} property
   */
  setVignette(vignette: number): AdjustRequest {
    this.vignette = vignette;
    return this;
  }

  /**
   * Setter for {@link AdjustRequest.format} property
   */
  setFormat(format: ImageFormat): AdjustRequest {
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
