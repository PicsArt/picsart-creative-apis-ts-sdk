/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Preview selected effects on an image
*/

import PicsartEnterprise, { EffectName, EffectPreviewsRequest, ImageApi } from "../src";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const imageSource = ImageApi.fromUrl(process.env.IMAGE_URL!);

  const result = await imageApi.effectPreviews(
    new EffectPreviewsRequest()
      .setImage(imageSource)
      .addEffect(EffectName.a1972)
      .addEffect(EffectName.brnz2)
      .addEffect(EffectName.icy3)
      .addEffect(EffectName.apr3),
  );

  console.log(result.thumbnails);
})();
