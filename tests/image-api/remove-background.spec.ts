import { describe, expect, it, vi } from "vitest";
import PicsartEnterprise, {
  ImageApi,
  ImageFormat,
  ImageScale,
  OutputType,
  RemoveBackgroundRequest,
  RemoveBackgroundResult,
} from "../../src";
import { getSingleImageSuccessResponse } from "../mock-responses";
import { faker } from "@faker-js/faker";
import { ValidationError } from "../../src/core/errors";

describe("Remove & Change Background", () => {
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
    const result = await imageApi.removeBackground(
      new RemoveBackgroundRequest().setImage(mainImage).setBgColor("green")
    );

    expect(result).instanceof(RemoveBackgroundResult);
    expect(result.image.url).equal(mockResponse.data.data.url);
    expect(result.image.id).equal(mockResponse.data.data.id);
  });

  it("Should return validation error.Checking outputType validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.removeBackground(
        new RemoveBackgroundRequest().setImage(mainImage).setOutputType("ssds" as OutputType.cutout)
      );
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("outputType")).toBe(true);
    }
  });

  it("Should return validation error.Checking bgBlur validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.removeBackground(new RemoveBackgroundRequest().setImage(mainImage).setBgBlur(101));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("bgBlur")).toBe(true);
    }
  });

  it("Should return validation error.Checking bgWidth validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.removeBackground(new RemoveBackgroundRequest().setImage(mainImage).setBgWidth(7000));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("bgWidth")).toBe(true);
    }
  });

  it("Should return validation error.Checking bgHeight validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.removeBackground(new RemoveBackgroundRequest().setImage(mainImage).setBgHeight(7000));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("bgHeight")).toBe(true);
    }
  });

  it("Should return validation error.Checking scale validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.removeBackground(new RemoveBackgroundRequest().setImage(mainImage).setScale("auto" as ImageScale));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("scale")).toBe(true);
    }
  });

  it("Should return validation error.Checking autoCenter validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.removeBackground(new RemoveBackgroundRequest().setImage(mainImage).setAutoCenter(11 as any));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("autoCenter")).toBe(true);
    }
  });

  it("Should return validation error.Checking strokeSize validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.removeBackground(new RemoveBackgroundRequest().setImage(mainImage).setStrokeSize(101));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("strokeSize")).toBe(true);
    }
  });

  it("Should return validation error.Checking strokeOpacity validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.removeBackground(new RemoveBackgroundRequest().setImage(mainImage).setStrokeOpacity(101));
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("strokeOpacity")).toBe(true);
    }
  });

  it("Should return validation error.Checking format validation", async () => {
    const mockResponse = getSingleImageSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const mainImage = ImageApi.fromUrl(faker.internet.url());

    try {
      await imageApi.removeBackground(
        new RemoveBackgroundRequest().setImage(mainImage).setFormat("GIF" as ImageFormat)
      );
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("format")).toBe(true);
    }
  });
});
