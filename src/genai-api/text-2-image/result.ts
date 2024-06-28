/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { AxiosResponse } from "axios";
import { ResultBase } from "../../core/result-base";

/*
 * Interface for the Text2Image response
 */
interface Text2ImageResponseItem {
  status: string;
  inference_id: string;
}

/**
 * Text to Image result class. It contains the initial response of the API request.
 * @category Results
 */
export class Text2ImageResult extends ResultBase {
  /*
   * The status received from the server
   */
  public readonly status: string;

  /*
   * The inferenceId that is used for polling results
   */
  public readonly inferenceId: string;

  constructor(response: AxiosResponse<Text2ImageResponseItem>) {
    super(response);

    this.status = response.data.status;
    this.inferenceId = response.data.inference_id;
  }
}
