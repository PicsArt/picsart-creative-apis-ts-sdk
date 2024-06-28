/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { AxiosResponse } from "axios";
import { ResultBase } from "../../core/result-base";
import { Image } from "../../core/image";

/**
 * Response interface in case of asynchronous processing
 */
interface UltraUpscaleTransactionResponse {
  status: string;
  transaction_id: string;
}

/**
 * Response interface in case of image is returned
 */
interface UltraUpscaleImageResponse {
  status: string;
  data: {
    id: string;
    url: string;
  };
}

/**
 * The result class of ultra upscale action.
 * @category Results
 */
export class UltraUpscaleResult extends ResultBase {
  /**
   * Image from response
   */
  public readonly image: Image;

  constructor(response: AxiosResponse<UltraUpscaleImageResponse>) {
    super(response);
    const { data } = response.data;
    this.image = new Image({ id: data.id, url: data.url });
  }
}

export class UltraUpscaleTransactionResult extends ResultBase {
  /**
   * In case of asynchronous processing transaction id will be returned.
   */
  readonly transactionId: string;

  constructor(response: AxiosResponse<UltraUpscaleTransactionResponse>) {
    super(response);
    this.transactionId = response.data.transaction_id;
  }
}
