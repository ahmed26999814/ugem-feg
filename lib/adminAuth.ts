import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { getSupabaseServiceKey } from "@/lib/supabaseEnv";

export const ADMIN_SESSION_COOKIE = "ugem_admin_session";

const SESSION_MAX_AGE = 60 * 60 * 8;

function getAdminUser() {
  return process.env.ANNONCES_ADMIN_USER;
}

function getAdminPass() {
  return process.env.ANNONCES_ADMIN_PASS;
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? getSupabaseServiceKey() ?? process.env.ANNONCES_ADMIN_PASS;
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminConfigured() {
  return Boolean(getAdminUser() && getAdminPass() && getSessionSecret());
}

export function isValidAdminCredentials(username: string, password: string) {
  const adminUser = getAdminUser();
  const adminPass = getAdminPass();

  if (!adminUser || !adminPass) return false;
  return username.trim().toLowerCase() === adminUser.toLowerCase() && safeCompare(password.trim(), adminPass);
}

function signSession(value: string) {
  const secret = getSessionSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createAdminSessionValue() {
  const user = getAdminUser();
  if (!user) return "";

  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${user}:${expires}`;
  return `${payload}:${signSession(payload)}`;
}

export async function hasAdminSession() {
  const session = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return false;

  const parts = session.split(":");
  if (parts.length !== 3) return false;

  const [user, expiresText, signature] = parts;
  const expires = Number(expiresText);
  if (!user || !Number.isFinite(expires) || expires < Date.now()) return false;

  const expected = signSession(`${user}:${expiresText}`);
  return Boolean(expected) && safeCompare(signature, expected);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
