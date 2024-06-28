/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Apply an effect to an image
*/
import PicsartEnterprise, { EffectName, EffectRequest, ImageApi } from "../src";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const imageSource = ImageApi.fromUrl(process.env.IMAGE_URL!);

  const result = await imageApi.effect(
    new EffectRequest()
      .setImage(imageSource)
      .setEffectName(EffectName.a1972)
  );

  console.log(result.image.url);
})();
