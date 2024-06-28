/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Upload file and get url/id using streams
*/

import  PicsartEnterprise, { ImageApi, UploadRequest } from "../src";
import { createReadStream } from "fs";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const readStream = createReadStream("examples/image.png");

  const imageSource = ImageApi.fromStream(readStream);
  const result = await imageApi.upload(
    new UploadRequest()
      .setImage(imageSource)
  );

  console.log(result.image.url);
})();
