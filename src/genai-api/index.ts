/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { GetText2ImageRequest, GetText2ImageResult } from "./get-text-2-image";
import { GENAI_API_DEFAULT_BASE_URL } from "../core/config";
import { ApiBase } from "../core/api-base";
import { Text2ImageRequest, Text2ImageResult } from "./text-2-image";
import { ApiClientOptions } from "../core/types";

export * from "./text-2-image";
export * from "./get-text-2-image";

/**
 * The main class of GenAI API. In this class are defined all the actions included in current API.
 * @category APIs
 */
export class GenaiApi extends ApiBase {
  constructor(apiKey: string, options?: Partial<ApiClientOptions>) {
    super(apiKey, { ...options, baseUrl: options?.baseUrl ?? GENAI_API_DEFAULT_BASE_URL });
  }

  /**
   * Generate images based on text prompt.
   * @param {Text2ImageRequest} request The request object containing text and configuration.
   * @returns {Promise<GetText2ImageResult>} A promise resolving to the result of image generation.
   * @example
   * ```typescript
   * const genaiApi = PicsartEnterprise.createGenAIApi(process.env.PICSART_API_KEY!);
   * const result = await genaiApi.text2Image(
   *   new Text2ImageRequest()
   *     .setCount(10)
   *     .setPrompt("coding all the time")
   *     .setNegativePrompt("relax and rest")
   * ```
   */
  async text2Image(request: Text2ImageRequest): Promise<GetText2ImageResult> {
    const result = new Text2ImageResult(await this.execute(request, { jsonPayload: true }));

    return new GetText2ImageResult(
      await this.executePolling(new GetText2ImageRequest(result.inferenceId), 1, { jsonPayload: true })
    );
  }
}
