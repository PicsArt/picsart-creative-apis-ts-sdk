/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Enhance face in an image
*/

import PicsartEnterprise, { EnhanceFaceRequest, ImageApi } from "../src";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const imageSource = ImageApi.fromUrl(process.env.IMAGE_URL!);

  const result = await imageApi
    .enhanceFace(
      new EnhanceFaceRequest()
        .setImage(imageSource),
    );

  console.log(result.image.url);
})();
