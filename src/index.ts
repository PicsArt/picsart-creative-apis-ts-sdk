/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { GenaiApi } from "./genai-api";
import { ImageApi } from "./image-api";
import { ApiClientOptions } from "./core/types";

export * from "./core/types";
export * from "./image-api";
export * from "./genai-api";

/**
 * Get an instance of ImageApi
 * @category Get API Instance
 */
export function createImageApi(apiKey: string, options?: Partial<ApiClientOptions>): ImageApi {
  return new ImageApi(apiKey, options);
}

/**
 * Get an instance of GenaiApi
 * @category Get API Instance
 */
export function createGenAIApi(apiKey: string, options?: Partial<ApiClientOptions>): GenaiApi {
  return new GenaiApi(apiKey, options);
}

/**
 * @ignore
 */
export default {
  createImageApi,
  createGenAIApi,
};
