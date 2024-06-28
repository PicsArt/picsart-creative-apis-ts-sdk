/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/*
  Get list of effects
*/

import PicsartEnterprise from "../src";

(async () => {
  const imageApi = PicsartEnterprise.createImageApi(process.env.PICSART_API_KEY!);
  const result = await imageApi.getEffects();
  console.log(result.effects)

  console.log(JSON.stringify(result, undefined, 2));
})();
