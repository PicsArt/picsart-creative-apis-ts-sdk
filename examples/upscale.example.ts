/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Upscale an image
*/
import  PicsartEnterprise, { ImageApi, UpscaleFactor, UpscaleRequest } from "../src";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const imageSource = ImageApi.fromUrl(process.env.IMAGE_URL!);

  const result = await imageApi.upscale(
    new UpscaleRequest()
      .setImage(imageSource)
      .setUpscaleFactor(UpscaleFactor.R2000x2000)
  );

  console.log(result.image);
})();
