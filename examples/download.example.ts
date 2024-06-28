/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Adjust and save image to a file
 */

import PicsartEnterprise, { AdjustRequest, ImageApi, ImageFormat } from "../src";
import * as fs from "fs/promises";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const imageSource = ImageApi.fromUrl(process.env.IMAGE_URL!);

  const result = await imageApi.adjust(
    new AdjustRequest()
      .setImage(imageSource)
      .setBrightness(70)
      .setFormat(ImageFormat.PNG)
  );

  const buffer = await result.image.downloadAsBuffer();
  await fs.writeFile('examples/download.png', buffer)
})();
