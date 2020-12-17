import { CustomError } from "./custom_error";

export abstract class DataBaseConnectionError extends CustomError {
  statusCode = 500;

  // This is for the response
  reason = "Error Connecting to the database";

  constructor() {
    // This is for Logging
    super("Error Connecting to DB");

    Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
