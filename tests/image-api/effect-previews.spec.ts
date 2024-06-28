import { describe, expect, it, vi } from "vitest";
import PicsartEnterprise, {
  EffectName,
  EffectPreviewsRequest,
  EffectPreviewsResult,
  ImageApi,
  ImageFormat,
} from "../../src";
import { getEffectPreviewsSuccessResponse } from "../mock-responses";
import { faker } from "@faker-js/faker";
import { ValidationError } from "../../src/core/errors";

describe("Effect Previews", () => {
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
    const mainImage = ImageApi.fromUrl(faker.internet.url());
    const request = new EffectPreviewsRequest()
      .setImage(mainImage)
      .addEffect(EffectName.a1972)
      .addEffect(EffectName.brnz2)
      .addEffect(EffectName.icy3)
      .addEffect(EffectName.apr3);
    const mockResponse = getEffectPreviewsSuccessResponse(request);
    mocks.request.mockResolvedValueOnce(mockResponse);
    const result = await imageApi.effectPreviews(request);

    expect(result).instanceof(EffectPreviewsResult);
    expect(Array.isArray(result.thumbnails)).toBe(true);

    result.thumbnails.forEach((thumbnail) => {
      expect(thumbnail).toHaveProperty("id");
      expect(thumbnail).toHaveProperty("url");
      expect(thumbnail).toHaveProperty("effectName");
    });
  });

  it("Should return validation error.Checking effect names validation", async () => {
    const mainImage = ImageApi.fromUrl(faker.internet.url());
    const request = new EffectPreviewsRequest();
    const mockResponse = getEffectPreviewsSuccessResponse(request);
    mocks.request.mockResolvedValueOnce(mockResponse);

    try {
      await imageApi.effectPreviews(new EffectPreviewsRequest().setImage(mainImage).addEffect("" as EffectName));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("effectNames")).toBe(true);
    }
  });

  it("Should return validation error.Checking preview size validation", async () => {
    const mainImage = ImageApi.fromUrl(faker.internet.url());
    const request = new EffectPreviewsRequest();
    const mockResponse = getEffectPreviewsSuccessResponse(request);
    mocks.request.mockResolvedValueOnce(mockResponse);

    try {
      await imageApi.effectPreviews(new EffectPreviewsRequest().setImage(mainImage).setPreviewSize(245));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("previewSize")).toBe(true);
    }
  });

  it("Should return validation error.Checking format validation", async () => {
    const mainImage = ImageApi.fromUrl(faker.internet.url());
    const request = new EffectPreviewsRequest();
    const mockResponse = getEffectPreviewsSuccessResponse(request);
    mocks.request.mockResolvedValueOnce(mockResponse);

    try {
      await imageApi.effectPreviews(new EffectPreviewsRequest().setImage(mainImage).setFormat("GIF" as ImageFormat));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("format")).toBe(true);
    }
  });
});
