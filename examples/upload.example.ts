/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Upload file and get url/id
*/

import  PicsartEnterprise, { ImageApi, UploadRequest } from "../src";
import { readFileSync } from "fs";
import { Blob } from "buffer";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);

  const fileContent = readFileSync("examples/image.png");

  const imageSource = ImageApi.fromFile(fileContent);
  const result = await imageApi.upload(
    new UploadRequest()
      .setImage(imageSource)
  );

  console.log(result.image.url);
})();
