/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Upscale an image asynchronously
*/
import PicsartEnterprise, { ImageApi, ProcessingMode, UltraUpscaleRequest } from "../src";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const imageSource = ImageApi.fromUrl(process.env.IMAGE_URL!);

  const result = await imageApi.ultraUpscale(
    new UltraUpscaleRequest()
      .setImage(imageSource)
      .setUpscaleFactor(4)
      .setMode(ProcessingMode.async),
  );

  console.log(result.image.url);
})();
