/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
/**
 * Delays execution for a specified amount of time.
 *
 * @param ms - The amount of time to delay execution for (in milliseconds).
 * @returns A promise that resolves after the specified delay.
 */
export function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/**
 * Converts a camelCase string to a snake_case string.
 *
 * @param name - The camelCase string to convert.
 * @returns The converted snake_case string.
 */
export function camelToSnakeCase(name: string): string {
  return name.replace(/[A-Z]/g, function (letter) {
    return "_" + letter.toLowerCase();
  });
}

/**
 * Generates a random integer between two specified values.
 *
 * @param min - The minimum possible value.
 * @param max - The maximum possible value.
 * @returns A random integer between min and max (inclusive).
 */
export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
