/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Base Url example
*/

import PicsartEnterprise from "../src";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!, {baseUrl: 'https://api.picsart.io/tools/1.0'});
  const result = await imageApi.getBalance();

  console.log(result.credits);
})();
