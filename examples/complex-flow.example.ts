/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Some complex flow with chaining
*/

import PicsartEnterprise, {
  EffectRequest,
  EffectResult,
  ImageApi,
  RemoveBackgroundRequest,
  RemoveBackgroundResult,
  Text2ImageRequest,
  GetText2ImageResult,
  GetText2ImageImageItem,
} from "../src";
import {} from "../src";

const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
const genAiApi = PicsartEnterprise.createGenAIApi(process.env.PICSART_API_KEY!);

(async () => {
  const imageSource = ImageApi.fromUrl(process.env.IMAGE_URL!);

  console.log('Generating images from text...');
  const results = await genAiApi
    .text2Image(
      new Text2ImageRequest()
        .setPrompt("Dog and Cat")
        .setNegativePrompt("grasses")
        .setCount(4),
    )

    .then(
      async (text2ImageResult: GetText2ImageResult): Promise<RemoveBackgroundResult[]> => {
        console.log('Setting backgrounds...');
        const images = text2ImageResult.images ?? [];
        return Promise.all(
          images.map((item: GetText2ImageImageItem) => {
            return imageApi.removeBackground(
              new RemoveBackgroundRequest()
                .setImage(imageSource)
                .setBgImage(item.image));
          }),
        );
      })

    .then(
      async (removeBackgroundResult: RemoveBackgroundResult[]): Promise<EffectResult[]> => {
        console.log('Getting list of effects...');
        const effectResult = await imageApi.getEffects();
        const randomIndex = Math.floor(Math.random() * effectResult.effects.length);
        const effect = effectResult.effects[randomIndex];

        console.log('Applying effects...');
        return Promise.all(
          removeBackgroundResult.map(
            (result: RemoveBackgroundResult) => {
              return imageApi.effect(
                new EffectRequest()
                  .setImage(result.image)
                  .setEffectName(effect.name));
            }),
        );
      });

  // TODO: getting error HTTP Error: 403 from URL:
  results.map((result): void => {
    console.log(result);
  });
})();
