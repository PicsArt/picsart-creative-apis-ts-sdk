/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { AxiosResponse } from "axios";
import { ResultBase } from "../../core/result-base";
import { Image } from "../../core/image";

/**
 * Interface for image response items
 */
interface GetText2ImageResponseItemImage {
  id: string;
  url: string;
  status: string;
}

/**
 * Interface for the response item
 */
interface GetText2ImageResponseItem {
  status: string;
  data: GetText2ImageResponseItemImage[];
}

/**
 * Class that represents an image item in GetText2ImageResult
 */
export class GetText2ImageImageItem {
  /*
   * Generated image
   */
  image: Image;

  /*
   * Status received from the server
   */
  status: string;

  constructor(id: string, url: string, status: string) {
    this.image = new Image({ url, id });
    this.status = status;
  }
}

/**
 * Result class for GetText2Image action
 * @category Results
 */
export class GetText2ImageResult extends ResultBase {
  /*
   * The status received from the server
   */
  public readonly status: string;
  /*
   * Array of generated images
   */
  public readonly images: GetText2ImageImageItem[];

  constructor(response: AxiosResponse<GetText2ImageResponseItem>) {
    super(response);

    this.status = response.data.status;
    this.images = response.data.data.map((item) => {
      return new GetText2ImageImageItem(item.id, item.url, item.status);
    });
  }
}
