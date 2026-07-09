import * as crypto from "crypto"

export type OfflinePayload = {
  key: string
  expiresAt: string
}

/** Canonical signing bytes: stable key order for RSA-SHA256 offline licenses. */
export function offlinePayloadBytes(payload: OfflinePayload): Buffer {
  const canonical = JSON.stringify({ expiresAt: payload.expiresAt, key: payload.key })
  return Buffer.from(canonical, "utf8")
}

export function verifyRsaSha256(payload: OfflinePayload, signatureB64: string, publicKeyPem: string): boolean {
  const sig = signatureB64.trim()
  const pem = publicKeyPem.trim()
  if (!sig || !pem) return false
  try {
    const key = crypto.createPublicKey(pem)
    return crypto.verify("RSA-SHA256", offlinePayloadBytes(payload), key, Buffer.from(sig, "base64"))
  } catch (err) {
    console.error("[Kilo New] RSA offline license verify failed:", err)
    return false
  }
}

