import { Request, Response, NextFunction } from "express";

export class BadRequestError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 400;
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof BadRequestError) {
    return res.status(err.status).json({ error: err.message || "Bad Request" });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
}
