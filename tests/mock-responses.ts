import { faker } from "@faker-js/faker";
import { EffectName, EffectPreviewsRequest, Text2ImageRequest } from "../src";

function getRandomHeaders() {
  return {
    "x-picsart-correlation-id": faker.string.uuid(),
    "x-picsart-ratelimit-available": faker.number.int({ min: 10, max: 500 }),
    "x-picsart-ratelimit-limit": faker.number.int({ min: 10, max: 500 }),
    "x-picsart-ratelimit-reset-time": faker.number.int({ min: 1, max: 59 }),
    "x-picsart-credit-available": faker.number.int({ min: 0, max: 500 }),
  };
}
export function getSingleImageSuccessResponse() {
  return {
    status: 200,
    headers: getRandomHeaders(),
    data: {
      status: "success",
      data: {
        id: `${faker.lorem.word()}.png`,
        url: faker.image.url(),
      },
    },
  };
}
export function getText2ImageImageSuccessResponse(request: Text2ImageRequest) {
  const data = [];
  const count = request.count ?? 1;
  for (let i = 0; i < count; ++i) {
    data.push({
      id: `${faker.lorem.word()}.png`,
      url: faker.image.url(),
      status: "success",
    });
  }
  return {
    status: 200,
    headers: getRandomHeaders(),
    data: {
      status: "DONE",
      data,
    },
  };
}

export function getTransactionSuccessResponse() {
  return {
    status: 202,
    headers: getRandomHeaders(),
    data: {
      status: "queued",
      transaction_id: faker.string.uuid(),
    },
  };
}

export function getInferenceSuccessResponse() {
  return {
    status: 202,
    headers: getRandomHeaders(),
    data: {
      status: "in progress",
      inference_id: faker.string.uuid(),
    },
  };
}

export function getBalanceSuccessResponse() {
  return {
    status: 200,
    headers: getRandomHeaders(),
    data: {
      credits: faker.number.int({ min: 0, max: 100 }),
    },
  };
}

export function getEffectsSuccessResponse() {
  return {
    status: 200,
    headers: getRandomHeaders(),
    data: {
      data: [
        {
          name: EffectName.apr3,
        },
        {
          name: EffectName.apr2,
        },
        {
          name: EffectName.mnch3,
        },
        {
          name: EffectName.a1972,
        },
      ],
    },
  };
}

export function getEffectPreviewsSuccessResponse(request: EffectPreviewsRequest) {
  return {
    status: 200,
    headers: getRandomHeaders(),
    data: {
      status: "success",
      data: Array.from(request.effectNames).map((effectName) => ({
        id: `${faker.lorem.word()}.png`,
        url: faker.image.url(),
        effectName,
      })),
    },
  };
}
