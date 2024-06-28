/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Ultra enhance is a new upscaling technique with a generative model which provides high frequency detail.
  It works well on images without noise and preserves details in a superior way.
*/

import PicsartEnterprise, { ImageApi, UltraEnhanceRequest } from "../src";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const imageSource = ImageApi.fromUrl(process.env.IMAGE_URL!);

  const result = await imageApi.ultraEnhance(
    new UltraEnhanceRequest()
      .setImage(imageSource)
      .setUpscaleFactor(6),
  );

  console.log(result.image.url);
})();
