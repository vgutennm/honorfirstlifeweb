import type { Request, Response, NextFunction } from "express";
import { ADMIN_COOKIE, verifySessionToken } from "../lib/session";

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token = req.cookies?.[ADMIN_COOKIE];
  if (!verifySessionToken(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
