import "server-only";

import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "crypto";

const PREFIX = "enc:v1";

function getKey(): Buffer {
  const secret =
    process.env.ENQUIRY_ENCRYPTION_KEY?.trim() ||
    process.env.KNOWLEDGE_ADMIN_TOKEN?.trim();

  if (!secret) {
    throw new Error(
      "Set ENQUIRY_ENCRYPTION_KEY or KNOWLEDGE_ADMIN_TOKEN to encrypt enquiries."
    );
  }

  return createHash("sha256").update(secret).digest();
}

export function encryptText(plain: string): string {
  if (!plain) return "";
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(plain, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return [
    PREFIX,
    iv.toString("base64url"),
    tag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(":");
}

export function decryptText(value: string): string {
  if (!value) return "";
  if (!value.startsWith(`${PREFIX}:`)) return value;

  // Stored as enc:v1:<iv>:<tag>:<data>. Do not split the whole string on ":"
  // or "enc:v1" becomes two parts and decrypt always fails.
  const parts = value.slice(PREFIX.length + 1).split(":");
  if (parts.length !== 3) return "[unable to decrypt]";

  try {
    const iv = Buffer.from(parts[0], "base64url");
    const tag = Buffer.from(parts[1], "base64url");
    const data = Buffer.from(parts[2], "base64url");
    const decipher = createDecipheriv("aes-256-gcm", getKey(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString(
      "utf8"
    );
  } catch {
    return "[unable to decrypt]";
  }
}
