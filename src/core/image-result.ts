/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { ResultBase } from "./result-base";
import { Image } from "./image";
import { AxiosResponse } from "axios";

/*
 * This is a reusable class which is a parent class of all those result classes that contain a single image
 */
export class ResultWithSingleImage extends ResultBase {
  /*
   * Image instance with url and id
   */
  public readonly image: Image;

  constructor(response: AxiosResponse) {
    super(response);

    const { data } = response.data;
    this.image = new Image({ id: data.id, url: data.url });
  }
}
