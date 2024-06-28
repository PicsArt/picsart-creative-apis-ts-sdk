import { describe, expect, it, vi } from "vitest";
import PicsartEnterprise, { AdjustRequest, AdjustResult, ImageApi, ImageFormat } from "../../src";
import { getSingleImageSuccessResponse } from "../mock-responses";
import { faker } from "@faker-js/faker";
import { ValidationError } from "../../src/core/errors";

describe("Adjust", () => {
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
    const result = await imageApi.adjust(new AdjustRequest().setImage(mainImage).setClarity(4));

    expect(result).instanceof(AdjustResult);
    expect(result.image.url).equal(mockResponse.data.data.url);
    expect(result.image.id).equal(mockResponse.data.data.id);
  });

  it("Should return validation error.Checking clarity validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setClarity(400));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("clarity")).toBe(true);
    }
  });

  it("Should return validation error.Checking brightness validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setBrightness(400));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("brightness")).toBe(true);
    }
  });

  it("Should return validation error.Checking contrast validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setContrast(400));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("contrast")).toBe(true);
    }
  });

  it("Should return validation error.Checking saturation validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setSaturation(400));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("saturation")).toBe(true);
    }
  });

  it("Should return validation error.Checking hue validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setHue(400));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("hue")).toBe(true);
    }
  });

  it("Should return validation error.Checking shadows validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setShadows(400));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("shadows")).toBe(true);
    }
  });

  it("Should return validation error.Checking highlights validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setHighlights(400));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("highlights")).toBe(true);
    }
  });

  it("Should return validation error.Checking temperature validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setTemperature(400));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("temperature")).toBe(true);
    }
  });

  it("Should return validation error.Checking sharpen validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setSharpen(400));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("sharpen")).toBe(true);
    }
  });

  it("Should return validation error.Checking noise validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setNoise(400));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("noise")).toBe(true);
    }
  });

  it("Should return validation error.Checking vignette validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setVignette(500));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("vignette")).toBe(true);
    }
  });

  it("Should return validation error.Checking format validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.adjust(new AdjustRequest().setImage(mainImage).setFormat("GIF" as ImageFormat));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("format")).toBe(true);
    }
  });
});
