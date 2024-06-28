/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/**
 * @category Enums
 */
export enum UpscaleFactor {
  R2000x2000 = "2",
  R1024x1024 = "4",
  R800x800 = "6",
  R600x600 = "8",
}

/**
 * @category Enums
 */
export enum OutputType {
  mask = "mask",
  cutout = "cutout",
}

/**
 * @category Enums
 */
export enum ImageScale {
  fit = "fit",
  fill = "fill",
}

/**
 * @category Enums
 */
export enum ImageFormat {
  JPEG = "JPG",
  PNG = "PNG",
  WEBP = "WEBP",
}

/**
 * @category Enums
 */
export enum ProcessingMode {
  sync = "sync",
  async = "async",
  auto = "auto",
}

/**
 * @category Enums
 */
export enum EffectName {
  apr1 = "apr1",
  apr2 = "apr2",
  apr3 = "apr3",
  brnz1 = "brnz1",
  brnz2 = "brnz2",
  brnz3 = "brnz3",
  brnz4 = "brnz4",
  cyber1 = "cyber1",
  cyber2 = "cyber2",
  dodger = "dodger",
  food1 = "food1",
  food2 = "food2",
  icy1 = "icy1",
  icy2 = "icy2",
  icy3 = "icy3",
  mnch1 = "mnch1",
  mnch2 = "mnch2",
  mnch3 = "mnch3",
  spc1 = "spc1",
  noise = "noise",
  nature1 = "nature1",
  nature2 = "nature2",
  ntrl1 = "ntrl1",
  ntrl2 = "ntrl2",
  pixelize = "pixelize",
  popart = "popart",
  saturation = "saturation",
  sft1 = "sft1",
  sft2 = "sft2",
  sft3 = "sft3",
  sft4 = "sft4",
  shadow1 = "shadow1",
  shadow2 = "shadow2",
  sketcher1 = "sketcher1",
  sketcher2 = "sketcher2",
  tl1 = "tl1",
  tl2 = "tl2",
  urban1 = "urban1",
  urban2 = "urban2",
  water1 = "water1",
  water2 = "water2",
  brl1 = "brl1",
  a1972 = "1972",
}

/**
 * @category Enums
 */
export enum TexturePattern {
  hex = "hex",
  mirror = "mirror",
  diamond = "diamond",
  hex2 = "hex2",
  tile = "tile",
}

/**
 * @internal
 */
export interface ExecuteOptions {
  /*
   * True when the request should be done asynchronously
   */
  async?: boolean;

  /*
   * True when request payload is application/json
   */
  jsonPayload?: boolean;
}

export interface ApiClientOptions {
  /*
   * Base URL of API server
   */
  baseUrl: string;
}
