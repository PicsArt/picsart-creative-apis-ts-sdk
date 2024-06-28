import { describe, expect, it, vi } from "vitest";
import PicsartEnterprise, { GetEffectsResult } from "../../src";
import { getEffectsSuccessResponse } from "../mock-responses";

describe("Get Effects", () => {
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
    const mockResponse = getEffectsSuccessResponse();
    mocks.request.mockResolvedValueOnce(mockResponse);

    const result = await imageApi.getEffects();

    expect(result).instanceof(GetEffectsResult);
    expect(Array.isArray(result.effects)).toBe(true);

    result.effects.forEach((effect) => {
      expect(effect).toHaveProperty("name");
    });
  });
});
