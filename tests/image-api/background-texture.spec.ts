import { describe, expect, it, vi } from "vitest";
import PicsartEnterprise, {
  BackgroundTextureRequest,
  BackgroundTextureResult,
  ImageApi,
  ImageFormat,
  TexturePattern,
} from "../../src";
import { getSingleImageSuccessResponse } from "../mock-responses";
import { faker } from "@faker-js/faker";
import { ValidationError } from "../../src/core/errors";

describe("Texture Generator", () => {
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
    const result = await imageApi.backgroundTexture(
      new BackgroundTextureRequest().setImage(mainImage).setPattern(TexturePattern.diamond).setHeight(800)
    );
    expect(result).instanceof(BackgroundTextureResult);
    expect(result.image.url).equal(mockResponse.data.data.url);
    expect(result.image.id).equal(mockResponse.data.data.id);
  });

  it("Should return validation error.Checking width validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.backgroundTexture(new BackgroundTextureRequest().setImage(mainImage).setWidth(9000));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("width")).toBe(true);
    }
  });

  it("Should return validation error.Checking height validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.backgroundTexture(new BackgroundTextureRequest().setImage(mainImage).setHeight(9000));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("height")).toBe(true);
    }
  });

  it("Should return validation error.Checking offset_x validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.backgroundTexture(new BackgroundTextureRequest().setImage(mainImage).setOffsetX(-60000));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("offsetX")).toBe(true);
    }
  });

  it("Should return validation error.Checking offset_y validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.backgroundTexture(new BackgroundTextureRequest().setImage(mainImage).setOffsetY(-60000));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("offsetY")).toBe(true);
    }
  });

  it("Should return validation error.Checking pattern validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.backgroundTexture(
        new BackgroundTextureRequest().setImage(mainImage).setPattern("" as TexturePattern)
      );
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("pattern")).toBe(true);
    }
  });

  it("Should return validation error.Checking rotate validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.backgroundTexture(new BackgroundTextureRequest().setImage(mainImage).setRotate(181));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("rotate")).toBe(true);
    }
  });

  it("Should return validation error.Checking scale validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.backgroundTexture(new BackgroundTextureRequest().setImage(mainImage).setScale(11));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("scale")).toBe(true);
    }
  });

  it("Should return validation error.Checking format validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());
    try {
      await imageApi.backgroundTexture(
        new BackgroundTextureRequest().setImage(mainImage).setFormat("GIF" as ImageFormat)
      );
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("format")).toBe(true);
    }
  });
});
