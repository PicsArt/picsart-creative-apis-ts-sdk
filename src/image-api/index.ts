/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { UltraEnhanceRequest, UltraEnhanceResult } from "./ultra-enhance";
import { Image } from "../core/image";
import { RemoveBackgroundRequest, RemoveBackgroundResult } from "./remove-background";

import { IMAGE_API_DEFAULT_BASE_URL } from "../core/config";
import { ApiBase } from "../core/api-base";
import { UpscaleRequest, UpscaleResult } from "./upscale";
import { UltraUpscaleRequest, UltraUpscaleResult, UltraUpscaleTransactionResult } from "./ultra-upscale";
import { EnhanceFaceRequest, EnhanceFaceResult } from "./enhance-face";
import { GetEffectsRequest, GetEffectsResult } from "./get-effects";
import { EffectRequest, EffectResult } from "./apply-effects";
import { EffectPreviewsRequest, EffectPreviewsResult } from "./effects-previews";
import { AdjustRequest, AdjustResult } from "./adjust";
import { BackgroundTextureRequest, BackgroundTextureResult } from "./background-texture";
import { SurfacemapRequest, SurfacemapResult } from "./surfacemap";
import { UploadRequest, UploadResult } from "./upload";
import { GetBalanceRequest, GetBalanceResult } from "./get-balance";
import { GetUltraUpscaleRequest } from "./get-ultra-upscale";
import { ApiClientOptions } from "../core/types";
import { ReadStream } from "fs";

export * from "./remove-background";
export * from "./upscale";
export * from "./ultra-upscale";
export * from "./ultra-enhance";
export * from "./enhance-face";
export * from "./get-effects";
export * from "./apply-effects";
export * from "./effects-previews";
export * from "./adjust";
export * from "./background-texture";
export * from "./surfacemap";
export * from "./upload";
export * from "./get-balance";

/**
 * The main class of Image API. In this class are defined all the actions included in current API.
 * @category APIs
 */
export class ImageApi extends ApiBase {
  constructor(apiKey: string, options?: Partial<ApiClientOptions>) {
    super(apiKey, { ...options, baseUrl: options?.baseUrl ?? IMAGE_API_DEFAULT_BASE_URL });
  }

  /**
   * Returns an Image object created from a URL string.
   * @param {string} url - The URL of the image.
   * @returns {Image} - An Image object.
   * @example
   * ```typescript
   * const image = ImageApi.fromUrl('https://example.com/image.jpg');
   * ```
   */
  static fromUrl(url: string): Image {
    return new Image({ url });
  }

  /**
   * Returns an Image object created from a Picsart image id.
   * @param {string} id - Picsart image id.
   * @returns {Image} - An Image object.
   * @example
   * ```typescript
   * const image = ImageApi.fromImageId('1066228a-3971-430b-a1c7-2bed2489ca8b');
   * ```
   */
  static fromImageId(id: string): Image {
    return new Image({ id });
  }

  /**
   * Returns an Image object created from a Buffer.
   * @param {Buffer} data - The Buffer data of the image.
   * @returns {Image} - An Image object.
   * @example
   * ```typescript
   * const fileContent = readFileSync("examples/image.png");
   * const image = ImageApi.fromFile(fileContent);
   * ```
   */
  static fromFile(data: Buffer): Image {
    return new Image({ data });
  }

  /**
   * Returns an Image object created from a Stream.
   * @param {ReadStream} data - The ReadStream of the image.
   * @returns {Image} - An Image object.
   * @example
   * ```typescript
   *  const readStream = createReadStream("examples/image.png");
   *  const imageSource = ImageApi.fromStream(readStream);
   * ```
   */
  static fromStream(data: ReadStream): Image {
    return new Image({ data });
  }

  /**
   * Removes the background from an image based on the provided request.
   * @param {RemoveBackgroundRequest} request - The request object containing image and parameters.
   * @returns {Promise<RemoveBackgroundResult>} - A promise resolving to the result of background removal.
   * @example
   * ```typescript
   *   const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   *   const imageSource = ImageApi.fromUrl('IMAGE_URL');
   *
   *   const result = await imageApi.removeBackground(
   *     new RemoveBackgroundRequest()
   *       .setImage(imageSource)
   *       .setBgColor("green")
   *   );
   *
   *   console.log(result.image.url);
   * ```
   */

  async removeBackground(request: RemoveBackgroundRequest): Promise<RemoveBackgroundResult> {
    return new RemoveBackgroundResult(await this.execute(request));
  }

  /**
   * Upscales an image based on the provided request.
   * @param {UpscaleRequest} request - The request object containing image and parameters.
   * @returns {Promise<UpscaleResult>} - A promise resolving to the result of image upscaling.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   * const imageSource = ImageApi.fromUrl('IMAGE_URL');
   *
   * const result = await imageApi.upscale(
   *   new UpscaleRequest()
   *     .setImage(imageSource)
   *     .setUpscaleFactor(UpscaleFactor.R2000x2000)
   * );
   *
   * console.log(result.image);
   * ```
   */
  async upscale(request: UpscaleRequest): Promise<UpscaleResult> {
    return new UpscaleResult(await this.execute(request));
  }

  /**
   * Performs an ultra upscaling operation on an image based on the provided request.
   * @param {UltraUpscaleRequest} request - The request object containing image and parameters.
   * @returns {Promise<UltraUpscaleResult>} - A promise resolving to the result of ultra upscaling.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   * const imageSource = ImageApi.fromUrl('IMAGE_URL');
   *
   * const result = await imageApi.ultraUpscale(
   *   new UltraUpscaleRequest()
   *     .setImage(imageSource)
   *     .setUpscaleFactor(4)
   *     .setMode(ProcessingMode.async),
   * );
   *
   * console.log(result.image.url);
   * ```
   */
  async ultraUpscale(request: UltraUpscaleRequest): Promise<UltraUpscaleResult> {
    const response = await this.execute(request);

    if (response.status === 200) {
      return new UltraUpscaleResult(response);
    }

    const result = new UltraUpscaleTransactionResult(response);

    return new UltraUpscaleResult(await this.executePolling(new GetUltraUpscaleRequest(result.transactionId)));
  }

  /**
   * Enhances an image based on the provided request.
   * @param {UltraEnhanceRequest} request - The request object containing image and parameters.
   * @returns {Promise<UltraEnhanceResult>} - A promise resolving to the result of image enhancement.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   * const imageSource = ImageApi.fromUrl('IMAGE_URL');
   *
   * const result = await imageApi.ultraEnhance(
   *   new UltraEnhanceRequest()
   *     .setImage(imageSource)
   *     .setUpscaleFactor(6),
   * );
   *
   * console.log(result.image.url);
   * ```
   */
  async ultraEnhance(request: UltraEnhanceRequest): Promise<UltraEnhanceResult> {
    return new UltraEnhanceResult(await this.execute(request));
  }

  /**
   * Enhances facial features in an image based on the provided request.
   * @param {EnhanceFaceRequest} request - The request object containing image and parameters.
   * @returns {Promise<EnhanceFaceResult>} - A promise resolving to the result of facial feature enhancement.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   * const imageSource = ImageApi.fromUrl('IMAGE_URL');
   *
   * const result = await imageApi
   *   .enhanceFace(
   *     new EnhanceFaceRequest()
   *       .setImage(imageSource),
   *   );
   *
   * console.log(result.image.url);
   * ```
   */
  async enhanceFace(request: EnhanceFaceRequest): Promise<EnhanceFaceResult> {
    return new EnhanceFaceResult(await this.execute(request));
  }

  /**
   * Retrieves a list of effects available through the image API.
   * @returns {Promise<GetEffectsResult>} - A promise resolving the result.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   * const result = await imageApi.getEffects();
   * console.log(result.effects)
   * ```
   */
  async getEffects(): Promise<GetEffectsResult> {
    return new GetEffectsResult(await this.execute(new GetEffectsRequest()));
  }

  /**
   * Applies an effect to an image based on the provided request.
   * @param {EffectRequest} request - The request object containing image and effect parameters.
   * @returns {Promise<EffectResult>} - A promise resolving to the result of applying the effect.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   * const imageSource = ImageApi.fromUrl('IMAGE_URL');
   *
   * const result = await imageApi.effect(
   *   new EffectRequest()
   *     .setImage(imageSource)
   *     .setEffectName(EffectName.a1972)
   * );
   * ```
   */
  async effect(request: EffectRequest): Promise<EffectResult> {
    return new EffectResult(await this.execute(request));
  }

  /**
   * Generates preview images with defined effects based on the provided request.
   * @param {EffectPreviewsRequest} request - The request object containing image and effect parameters.
   * @returns {Promise<EffectPreviewsResult>} - A promise resolving to the result of generating effect previews.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   * const imageSource = ImageApi.fromUrl('IMAGE_URL');
   *
   * const result = await imageApi.effectPreviews(
   *   new EffectPreviewsRequest()
   *     .setImage(imageSource)
   *     .addEffect(EffectName.a1972)
   *     .addEffect(EffectName.brnz2)
   *     .addEffect(EffectName.icy3)
   *     .addEffect(EffectName.apr3),
   * );
   * ```
   */
  async effectPreviews(request: EffectPreviewsRequest): Promise<EffectPreviewsResult> {
    return new EffectPreviewsResult(await this.execute(request));
  }

  /**
   * Adjusts an image based on the provided request.
   * @param {AdjustRequest} request - The request object containing image adjustment parameters.
   * @returns {Promise<AdjustResult>} - A promise resolving to the result of adjusting the image.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   * const imageSource = ImageApi.fromUrl('IMAGE_URL');
   *
   * const result = await imageApi.adjust(
   *   new AdjustRequest()
   *     .setImage(imageSource)
   *     .setBrightness(90)
   *     .setSharpen(40)
   * );
   * ```
   */
  async adjust(request: AdjustRequest): Promise<AdjustResult> {
    return new AdjustResult(await this.execute(request));
  }

  /**
   * Applies a background texture to an image based on the provided request.
   * @param {BackgroundTextureRequest} request - The request object containing image and texture parameters.
   * @returns {Promise<BackgroundTextureResult>} - A promise resolving to the result of applying the background texture.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   * const imageSource = ImageApi.fromUrl('IMAGE_URL');
   *
   * const result = await imageApi.backgroundTexture(
   *   new BackgroundTextureRequest()
   *     .setImage(imageSource)
   *     .setPattern(TexturePattern.diamond)
   *     .setHeight(800)
   * );
   * ```
   */
  async backgroundTexture(request: BackgroundTextureRequest): Promise<BackgroundTextureResult> {
    return new BackgroundTextureResult(await this.execute(request));
  }

  /**
   * Generates a surfacemap for an image based on the provided request.
   * @param {SurfacemapRequest} request - The request object containing image and surfacemap parameters.
   * @returns {Promise<SurfacemapResult>} - A promise resolving to the result of generating the surfacemap.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   * const imageSource1 = ImageApi.fromUrl('IMAGE_URL1');
   * const imageSource2 = ImageApi.fromUrl('IMAGE_URL2');
   * const imageSource3 = ImageApi.fromUrl('IMAGE_URL3');
   *
   * const result = await imageApi.surfacemap(
   *     new SurfacemapRequest()
   *       .setImage(imageSource1)
   *       .setMask(imageSource2)
   *       .setSticker(imageSource3)
   *   );
   *
   * ```
   */
  async surfacemap(request: SurfacemapRequest): Promise<SurfacemapResult> {
    return new SurfacemapResult(await this.execute(request));
  }

  /**
   * Uploads an image based on the provided request.
   * @param {UploadRequest} request - The request object containing image upload parameters.
   * @returns {Promise<UploadResult>} - A promise resolving to the result of the image upload.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi('API_KEY');
   *
   * const fileContent = readFileSync("examples/image.png");
   * const blob = new Blob([fileContent]);
   *
   * const imageSource = ImageApi.fromFile(blob);
   * const result = await imageApi.upload(
   *   new UploadRequest()
   *     .setImage(imageSource)
   * );
   * ```
   */
  async upload(request: UploadRequest): Promise<UploadResult> {
    return new UploadResult(await this.execute(request));
  }

  /**
   * Check your balance of credits.
   * @returns {Promise<GetBalanceResult>} - A promise resolving to the result of the balance retrieval.
   * @example
   * ```typescript
   * const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
   * const result = await imageApi.getBalance();
   * ```
   */
  async getBalance(): Promise<GetBalanceResult> {
    return new GetBalanceResult(await this.execute(new GetBalanceRequest()));
  }
}
