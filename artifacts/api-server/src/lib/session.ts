import crypto from "node:crypto";

const IS_PRODUCTION = process.env["NODE_ENV"] === "production";

if (IS_PRODUCTION && !process.env["SESSION_SECRET"]) {
  throw new Error(
    "SESSION_SECRET must be set in production to sign admin sessions.",
  );
}
if (IS_PRODUCTION && !process.env["ADMIN_PASSWORD"]) {
  throw new Error(
    "ADMIN_PASSWORD must be set in production to protect the admin dashboard.",
  );
}

const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "dev-insecure-secret";
export const ADMIN_COOKIE = "hfl_admin";
const MAX_AGE_MS = 1000 * 60 * 60 * 12; // 12 hours

/**
 * Returns the configured admin password. Falls back to a development default
 * if ADMIN_PASSWORD is not set so the dashboard is usable locally. In
 * production, startup fails (above) unless ADMIN_PASSWORD is set.
 */
export function getAdminPassword(): string {
  return process.env["ADMIN_PASSWORD"] ?? "honorfirst-admin";
}

export function isStrongAdminConfigured(): boolean {
  return Boolean(process.env["ADMIN_PASSWORD"]);
}

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");
}

export function createSessionToken(): string {
  const expires = Date.now() + MAX_AGE_MS;
  const payload = `admin.${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, expiresStr, signature] = parts;
  const payload = `${role}.${expiresStr}`;
  const expected = sign(payload);
  if (
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return false;
  }
  const expires = Number(expiresStr);
  if (Number.isNaN(expires) || expires < Date.now()) return false;
  return role === "admin";
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env["NODE_ENV"] === "production",
    maxAge: MAX_AGE_MS,
    path: "/",
  };
}
