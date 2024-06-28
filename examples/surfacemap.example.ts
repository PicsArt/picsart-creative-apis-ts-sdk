/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  With the surface map tool you can "print" a sticker over an (target) image.
  Using a mask, the Surfacemap tool maps the sticker pixels using the texture and curves on the target image
  thus ultimately giving a live-print-preview effect.
*/

import  PicsartEnterprise, { ImageApi, SurfacemapRequest } from "../src";
import { readFileSync } from "fs";
import { Blob } from "buffer";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const imageSource = ImageApi.fromUrl(process.env.IMAGE_URL!);

  const fileContent = readFileSync("examples/image.png");
  const blob = new Blob([fileContent]);

  const result = await imageApi.surfacemap(
    new SurfacemapRequest()
      .setImage(imageSource)
      .setMask(ImageApi.fromUrl('https://cdn.picsart.io/cac54bcc-9c20-4c1b-be42-78a5ce167a07.png'))
      .setSticker(ImageApi.fromFile(blob))
  );

  console.log(result.image.url);
})();
