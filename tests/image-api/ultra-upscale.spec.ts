import { describe, expect, it, vi } from "vitest";
import PicsartEnterprise, {
  ImageApi,
  ImageFormat,
  ProcessingMode,
  UltraUpscaleRequest,
  UltraUpscaleResult,
} from "../../src";
import { getSingleImageSuccessResponse, getTransactionSuccessResponse } from "../mock-responses";
import { faker } from "@faker-js/faker";
import { ValidationError } from "../../src/core/errors";

describe("Ultra upscale", () => {
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

  it(
    "Success result should contain all the necessary fields",
    async () => {
      const transactionResponse = getTransactionSuccessResponse();
      const imageResponse = getSingleImageSuccessResponse();
      let requestedCount = 0;
      mocks.request.mockImplementation(() => {
        requestedCount++;
        if (requestedCount === 1) {
          return transactionResponse;
        }
        if (requestedCount === 2) {
          return transactionResponse;
        }
        if (requestedCount === 3) {
          return imageResponse;
        }
      });

      const mainImage = ImageApi.fromUrl(faker.internet.url());
      const result = await imageApi.ultraUpscale(
        new UltraUpscaleRequest().setImage(mainImage).setMode(ProcessingMode.async).setUpscaleFactor(4)
      );

      expect(result).instanceof(UltraUpscaleResult);
      expect(result.image.url).equal(imageResponse.data.data.url);
      expect(result.image.id).equal(imageResponse.data.data.id);

      mocks.request.mockRestore();
    },
    { timeout: 50000 }
  );

  it("Should return validation error.Checking upscaleFactor validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.ultraUpscale(new UltraUpscaleRequest().setImage(mainImage).setUpscaleFactor(20));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("upscaleFactor")).toBe(true);
    }
  });

  it("Should return validation error.Checking format validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.ultraUpscale(new UltraUpscaleRequest().setImage(mainImage).setFormat("GIF" as ImageFormat));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("format")).toBe(true);
    }
  });

  it("Should return validation error.Checking mode validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.ultraUpscale(new UltraUpscaleRequest().setImage(mainImage).setMode("" as ProcessingMode));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("mode")).toBe(true);
    }
  });
});
