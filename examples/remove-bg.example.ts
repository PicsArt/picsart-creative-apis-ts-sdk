/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Remove background of an image
*/

import  PicsartEnterprise, { ImageApi, RemoveBackgroundRequest } from "../src";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const imageSource = ImageApi.fromUrl(process.env.IMAGE_URL!);

  const result = await imageApi.removeBackground(
    new RemoveBackgroundRequest()
      .setImage(imageSource)
      .setBgColor("green")
  );

  console.log(result.image.url);
})();
