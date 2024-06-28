import { describe, expect, it, vi } from "vitest";
import PicsartEnterprise, { ImageApi, UploadRequest, UploadResult } from "../../src";
import { getSingleImageSuccessResponse } from "../mock-responses";
import { readFileSync } from "fs";

describe("Upload", () => {
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

    const fileContent = readFileSync("tests/image.png");

    const mainImage = ImageApi.fromFile(fileContent);
    const result = await imageApi.upload(new UploadRequest().setImage(mainImage));

    expect(result).instanceof(UploadResult);
    expect(result.image.url).equal(mockResponse.data.data.url);
    expect(result.image.id).equal(mockResponse.data.data.id);
  });
});
