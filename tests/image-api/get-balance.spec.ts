import { describe, expect, it, vi } from "vitest";
import PicsartEnterprise, { GetBalanceResult } from "../../src";
import { getBalanceSuccessResponse } from "../mock-responses";

describe("Get Balance", () => {
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
    const mockResponse = getBalanceSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const result = await imageApi.getBalance();

    expect(result).instanceof(GetBalanceResult);
    expect(result.credits).equal(mockResponse.data.credits);
  });
});
