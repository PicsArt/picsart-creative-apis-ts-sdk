/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import * as Yup from "yup";

export const SingleImageSourceSchema = Yup.object()
  .shape({
    image: Yup.mixed(),
    imageUrl: Yup.string(),
    imageId: Yup.string(),
  })
  .test(
    "single-bg-image-source",
    "A single image source parameters must be provided for background.",
    ({ image, imageUrl, imageId }) => [image, imageUrl, imageId].filter((v) => v).length === 1
  );

export const SingleImageSourceUploadSchema = Yup.object()
  .shape({
    image: Yup.mixed(),
    imageUrl: Yup.string(),
  })
  .test(
    "single-bg-image-source",
    "A single image source parameters must be provided for background.",
    ({ image, imageUrl }) => [image, imageUrl].filter((v) => v).length === 1
  );

export const SingleMaskImageSourceSchema = Yup.object()
  .shape({
    mask: Yup.mixed(),
    maskUrl: Yup.string(),
    maskId: Yup.string(),
  })
  .test(
    "single-bg-mask-source",
    "A single mask source parameters must be provided for background.",
    ({ mask, maskUrl, maskId }) => [mask, maskUrl, maskId].filter((v) => v).length === 1
  );

export const SingleStickerImageSourceSchema = Yup.object()
  .shape({
    sticker: Yup.mixed(),
    stickerUrl: Yup.string(),
    stickerId: Yup.string(),
  })
  .test(
    "single-bg-sticker-source",
    "A single sticker source parameters must be provided for background.",
    ({ sticker, stickerUrl, stickerId }) => [sticker, stickerUrl, stickerId].filter((v) => v).length === 1
  );

export const SingleBgImageOptionalSchema = Yup.object()
  .shape({
    bgImage: Yup.mixed(),
    bgImageUrl: Yup.string(),
    bgImageId: Yup.string(),
  })
  .test(
    "single-bg-image-source",
    "A single background image source parameters must be provided.",
    ({ bgImage, bgImageUrl, bgImageId }) => [bgImage, bgImageUrl, bgImageId].filter((v) => v).length <= 1
  );
