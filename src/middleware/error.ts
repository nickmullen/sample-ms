import { Request, Response, NextFunction } from "express";
import { error } from "../utils/log";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  error(err);
  if (err instanceof HTTPError) {
    res.status(err.statusCode).json({ ...err.toJson(), path: req.path });
  }

  const e: ServerError = new ServerError(err.message.trim() === "" ? undefined : err.message);
  res.status(e.statusCode).json({ ...e.toJson(), path: req.path });
};

export class HTTPError extends Error {
  statusCode: number;
  constructor(message: string | undefined, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  toJson() {
    return {
      status: "error",
      message: this.message
    };
  }
}

export class NotFoundError extends HTTPError {
  constructor(message = "Not Found Error") {
    super(message, 404);
  }
}

export class ServerError extends HTTPError {
  constructor(message = "Server Error") {
    super(message, 500);
  }
}
export class BadRequest extends HTTPError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}
export class Conflict extends HTTPError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}
