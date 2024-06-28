/**
 * MIT License {@link https://github.com/PicsArt/picsart-creative-apis-ts-sdk/blob/main/LICENSE.txt}
 *
 * Copyright (c) 2024 PicsArt, Inc.
 */
import { RequestBase } from "./request-base";

/*
 * This is the parent class of all http exceptions
 */
export class PicsartApiError extends Error {
  /*
   * Instance of the request that was failed
   */
  request: RequestBase;

  /*
   * HTTP status code of the error
   */
  code: number;

  /*
   * Error message
   */
  message: string;

  /*
   * Error details
   */
  detail: any;

  constructor(code: number, request: RequestBase, message: string, detail?: any) {
    super(message);
    this.code = code;
    this.request = request;
    this.message = message;
    this.detail = detail;
  }
}

/*
 * This error ir thrown in case of local validation errors
 */
export class ValidationError extends Error {
  /*
   * Instance of the request where validation failed
   */
  request: RequestBase;
  /*
   * Error message
   */
  message: string;
  /*
   * Error details
   */
  detail: any;

  constructor(request: RequestBase, message: string, detail?: any) {
    super(message);
    this.request = request;
    this.message = message;
    this.detail = detail;
  }
}

/*
 * This is a general error that is used in all cases except HTTP error and validation error.
 */
export class GeneralError extends Error {
  /*
   * Instance of the request where validation failed
   */
  request: RequestBase;
  /*
   * Error message
   */
  message: string;
  /*
   * Error details
   */
  detail: any;

  constructor(request: RequestBase, message: string, detail?: any) {
    super(message);
    this.request = request;
    this.message = message;
    this.detail = detail;
  }
}

export class NotFoundError extends PicsartApiError {
  constructor(request: RequestBase, message: string, detail?: any) {
    super(404, request, message, detail);
  }
}

export class BadRequestError extends PicsartApiError {
  constructor(request: RequestBase, message: string, detail?: any) {
    super(400, request, message, detail);
  }
}

export class UnauthorizedError extends PicsartApiError {
  constructor(request: RequestBase, message: string, detail?: any) {
    super(401, request, message, detail);
  }
}

export class ForbiddenError extends PicsartApiError {
  constructor(request: RequestBase, message: string, detail?: any) {
    super(403, request, message, detail);
  }
}

export class MethodNotAllowedError extends PicsartApiError {
  constructor(request: RequestBase, message: string, detail?: any) {
    super(405, request, message, detail);
  }
}

export class RequestEntityTooLargeError extends PicsartApiError {
  constructor(request: RequestBase, message: string, detail?: any) {
    super(413, request, message, detail);
  }
}

export class UnsupportedMediaTypeError extends PicsartApiError {
  constructor(request: RequestBase, message: string, detail?: any) {
    super(415, request, message, detail);
  }
}

export class TooManyRequestsError extends PicsartApiError {
  constructor(request: RequestBase, message: string, detail?: any) {
    super(429, request, message, detail);
  }
}

export class RequestHeaderFieldsTooLargeError extends PicsartApiError {
  constructor(request: RequestBase, message: string, detail?: any) {
    super(431, request, message, detail);
  }
}

export class InternalServerError extends PicsartApiError {
  constructor(request: RequestBase, message: string, detail?: any) {
    super(500, request, message, detail);
  }
}

export class ServiceUnavailableError extends PicsartApiError {
  constructor(request: RequestBase, message: string, detail?: any) {
    super(503, request, message, detail);
  }
}
