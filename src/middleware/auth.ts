import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: number;
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
