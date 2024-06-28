/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { Buffer } from "buffer";
import axios, { AxiosResponse, ResponseType } from "axios";
import { ReadStream } from "fs";

interface ImageParams {
  /*
   * Public url of an image
   */
  url?: string;
  /*
   * Picsart image id
   */
  id?: string;
  /*
   * Buffer or a stream of an image
   */
  data?: Buffer | ReadStream;
}

/*
 * This class is used as an image source or result.
 * It can contain image id, url or data
 */
export class Image implements ImageParams {
  /*
   * Public url of an image
   */
  readonly url?: string;
  /*
   * Picsart image id
   */
  readonly id?: string;

  /*
   * Buffer or a stream of an image
   */
  readonly data?: Buffer | ReadStream;

  constructor({ url, id, data }: ImageParams) {
    this.url = url;
    this.id = id;
    this.data = data;
  }

  /**
   * This is a common private method that downloads an image from a public url
   *
   * @async
   * @param {ResponseType} responseType - response type that axios needs to return
   * @returns {Promise<AxiosResponse>} A promise that resolves to a Base64 encoded string of the downloaded image.
   * @throws {Error} Will throw an error if there is no url or the image downloading fails.
   */
  private async downloadImage(responseType: ResponseType): Promise<AxiosResponse> {
    if (!this.url) {
      throw new Error("Cannot download image as URL is missing in the instance");
    }

    return axios.get(this.url, { responseType });
  }

  /**
   * Download image and return as a Base64 encoded string.
   * Takes no parameters.
   *
   * @async
   * @returns {Promise<string>} A promise that resolves to a Base64 encoded string of the downloaded image.
   * @throws {Error} Will throw an error if the image downloading or Base64 transformation fails.
   */
  async downloadAsBase64(): Promise<string> {
    const response = await this.downloadImage("arraybuffer");

    return Buffer.from(response.data, "binary").toString("base64");
  }

  /**
   * Download image and return as a Buffer.
   * Takes no parameters.
   *
   * @async
   * @returns {Promise<Buffer>} A promise that resolves to a Buffer of the downloaded image.
   * @throws {Error} Will throw an error if the image downloading fails.
   */
  async downloadAsBuffer(): Promise<Buffer> {
    const response = await this.downloadImage("arraybuffer");

    return Buffer.from(response.data, "binary");
  }

  /**
   * Download image and return as a Blob.
   * Takes no parameters.
   *
   * @async
   * @returns {Promise<Blob>} A promise that resolves to a Blob of the downloaded image.
   * @throws {Error} Will throw an error if the image downloading fails.
   */
  async downloadAsBlob(): Promise<Blob> {
    const response = await this.downloadImage("blob");

    return response.data;
  }
}
