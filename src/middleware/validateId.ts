import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "./error";

export function validateId(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  if (!id) {
    return next(new BadRequestError("Task ID is required."));
  }

  const num = parseInt(id, 10);

  if (!Number.isInteger(num) || num < 1) {
    return next(new BadRequestError("Invalid Task ID format."));
  }

  (req as any).taskId = num;
  next();
}
