/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Generate images from text prompt
*/

import  PicsartEnterprise, { Text2ImageRequest } from "../src";

(async () => {
  const genaiApi = PicsartEnterprise.createGenAIApi(process.env.PICSART_API_KEY!);
  const result = await genaiApi.text2Image(
    new Text2ImageRequest()
      .setCount(10)
      .setPrompt("coding all the time")
      .setNegativePrompt("relax and rest")
  );


  console.log(JSON.stringify(result, null, 2));
})();
