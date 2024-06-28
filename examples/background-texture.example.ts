/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Generate a texture using an image
*/

import  PicsartEnterprise, { BackgroundTextureRequest, ImageApi, TexturePattern } from "../src";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const imageSource = ImageApi.fromUrl(process.env.IMAGE_URL!);

  const result = await imageApi.backgroundTexture(
    new BackgroundTextureRequest()
      .setImage(imageSource)
      .setPattern(TexturePattern.diamond)
      .setHeight(800)
  );

  console.log(result);
})();
