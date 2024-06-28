/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import * as Yup from "yup";
import { RequestBase } from "../../core/request-base";

/**
 * The request class of text to image action.
 * @category Requests
 */
export class Text2ImageRequest extends RequestBase {
  /**
   * The prompt.
   */
  prompt: string | undefined;
  /**
   * The negative prompt (don’t generate this type of images).
   * Don't use the nagitve keywords such as 'no', e.g.
   * don't use 'no distorted faces', use 'distorted faces'.
   */
  negativePrompt: string | undefined;
  /**
   * Width of the image.
   */
  width: number | undefined;
  /**
   * Height of the image.
   */
  height: number | undefined;
  /**
   * The number of images to generate.
   */
  count: number | undefined;
  protected requestValidationSchema = Yup.object().shape({
    prompt: Yup.string().min(7).max(100).required(),
    negativePrompt: Yup.string().min(7).max(100).required(),
    width: Yup.number().min(50),
    height: Yup.number().min(50),
    count: Yup.number().integer().min(1).max(10),
  });

  constructor() {
    super("POST", "/text2image");
  }

  /**
   * Setter for {@link Text2ImageRequest.prompt} property
   */
  setPrompt(prompt: string): Text2ImageRequest {
    this.prompt = prompt;
    return this;
  }

  /**
   * Setter for {@link Text2ImageRequest.negativePrompt} property
   */
  setNegativePrompt(negativePrompt: string): Text2ImageRequest {
    this.negativePrompt = negativePrompt;
    return this;
  }

  /**
   * Setter for {@link Text2ImageRequest.width} property
   */
  setWidth(width: number): Text2ImageRequest {
    this.width = width;
    return this;
  }

  /**
   * Setter for {@link Text2ImageRequest.height} property
   */
  setHeight(height: number): Text2ImageRequest {
    this.height = height;
    return this;
  }

  /**
   * Setter for {@link Text2ImageRequest.count} property
   */
  setCount(count: number): Text2ImageRequest {
    this.count = count;
    return this;
  }
}
