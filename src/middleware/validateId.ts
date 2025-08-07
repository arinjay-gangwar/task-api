import { Request, Response, NextFunction } from "express";

export function validateId(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Task ID is required." });
  }

  const num = parseInt(id, 10);

  if (!Number.isInteger(num) || num < 1) {
    return res.status(400).json({ error: "Invalid Task ID format." });
  }

  (req as any).taskId = num;
  next();
}
