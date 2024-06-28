import { describe, expect, it, vi } from "vitest";
import PicsartEnterprise, { Text2ImageRequest } from "../../src";
import { getInferenceSuccessResponse, getText2ImageImageSuccessResponse } from "../mock-responses";
import { GetText2ImageResult } from "../../src/genai-api/get-text-2-image";
import { GeneralError, ValidationError } from "../../src/core/errors";

describe("Text 2 Image", () => {
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

  const genaiApi = PicsartEnterprise.createGenAIApi("");

  it("Success result should contain all the necessary fields", async () => {
    const inferenceResponse = getInferenceSuccessResponse();

    const request = new Text2ImageRequest()
      .setCount(10)
      .setPrompt("jumping over planets with some complex texture in the background")
      .setNegativePrompt("no dogs");
    const imageResponse = getText2ImageImageSuccessResponse(request);

    let requestedCount = 0;
    mocks.request.mockImplementation(() => {
      requestedCount++;
      if (requestedCount === 1) {
        return inferenceResponse;
      }
      if (requestedCount === 2) {
        return inferenceResponse;
      }
      if (requestedCount === 3) {
        return imageResponse;
      }
    });

    const result = await genaiApi.text2Image(request);

    expect(result).instanceof(GetText2ImageResult);
    expect(result.images.length).toBe(request.count);

    mocks.request.mockRestore();
  });

  it("Should fail when too many tries of polling are done", async () => {
    const inferenceResponse = getInferenceSuccessResponse();

    const request = new Text2ImageRequest()
      .setCount(10)
      .setPrompt("jumping over planets with some complex texture in the background")
      .setNegativePrompt("dogssss");

    mocks.request.mockImplementation(() => {
      return inferenceResponse;
    });

    try {
      await genaiApi.text2Image(request);
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(GeneralError);
    }

    mocks.request.mockRestore();
  });

  it("Should return validation error.Checking prompt validation", async () => {
    try {
      const request = new Text2ImageRequest().setPrompt("jump");
      await genaiApi.text2Image(request);
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("prompt")).toBe(true);
    }
  });

  it("Should return validation error.Checking negativePrompt validation", async () => {
    try {
      const request = new Text2ImageRequest().setNegativePrompt("jump");
      await genaiApi.text2Image(request);
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("negativePrompt")).toBe(true);
    }
  });

  it("Should return validation error.Checking width validation", async () => {
    try {
      const request = new Text2ImageRequest().setWidth(10);
      await genaiApi.text2Image(request);
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("width")).toBe(true);
    }
  });

  it("Should return validation error.Checking height validation", async () => {
    try {
      const request = new Text2ImageRequest().setHeight(10);
      await genaiApi.text2Image(request);
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("height")).toBe(true);
    }
  });

  it("Should return validation error.Checking count validation", async () => {
    try {
      const request = new Text2ImageRequest().setCount(11);
      await genaiApi.text2Image(request);
      throw new Error("Request didnt fail");
    } catch (err: unknown) {
      expect(err).instanceof(ValidationError);
      expect(JSON.stringify((err as ValidationError).detail).includes("count")).toBe(true);
    }
  });
});
