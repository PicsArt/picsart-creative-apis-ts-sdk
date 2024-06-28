import { describe, expect, it, vi } from "vitest";
import PicsartEnterprise, { ImageApi, ImageFormat, SurfacemapRequest, SurfacemapResult } from "../../src";
import { getSingleImageSuccessResponse } from "../mock-responses";
import { faker } from "@faker-js/faker";
import { ValidationError } from "../../src/core/errors";

describe("Surfacemap", () => {
  const mocks = vi.hoisted(() => ({
    request: vi.fn(),
  }));

  vi.mock("axios", async (importActual) => {
    const actual = await importActual<typeof import("axios")>();

    return {
      default: {
        create: () => ({
          ...actual,
          request: mocks.request,
        }),
      },
    };
  });

  const imageApi = PicsartEnterprise.createImageApi("");

  it("Success result should contain all the necessary fields", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    const maskImage = ImageApi.fromUrl(faker.internet.url());
    const stickerImage = ImageApi.fromUrl(faker.internet.url());
    const result = await imageApi.surfacemap(
      new SurfacemapRequest().setImage(mainImage).setMask(maskImage).setSticker(stickerImage)
    );

    expect(result).instanceof(SurfacemapResult);
    expect(result.image.url).equal(mockResponse.data.data.url);
    expect(result.image.id).equal(mockResponse.data.data.id);
  });

  it("Should return validation error.Checking mask validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.surfacemap(new SurfacemapRequest().setImage(mainImage));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("mask")).toBe(true);
    }
  });

  it("Should return validation error.Checking sticker validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.surfacemap(new SurfacemapRequest().setImage(mainImage));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("sticker")).toBe(true);
    }
  });

  it("Should return validation error.Checking format validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.surfacemap(new SurfacemapRequest().setImage(mainImage).setFormat("GIF" as ImageFormat));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("format")).toBe(true);
    }
  });
});
