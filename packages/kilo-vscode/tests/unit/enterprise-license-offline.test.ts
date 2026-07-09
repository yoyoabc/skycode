import * as crypto from "crypto"
import * as fs from "fs"
import * as os from "os"
import * as path from "path"
import { afterEach, describe, expect, it } from "bun:test"
import { offlinePayloadBytes, verifyRsaSha256 } from "../../src/enterprise/license-crypto"
import { parseOfflineLicense } from "../../src/enterprise/license"

const tmpFiles: string[] = []

afterEach(() => {
  for (const file of tmpFiles) {
    try {
      fs.unlinkSync(file)
    } catch {
      // ignore
    }
  }
  tmpFiles.length = 0
})

function writeLicense(data: object) {
  const file = path.join(os.tmpdir(), `license-${Date.now()}-${Math.random()}.json`)
  fs.writeFileSync(file, JSON.stringify(data))
  tmpFiles.push(file)
  return file
}

function devKeys() {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  })
}

function sign(payload: { key: string; expiresAt: string }, privateKey: string) {
  const canonical = JSON.stringify({ expiresAt: payload.expiresAt, key: payload.key })
  return crypto.sign("RSA-SHA256", Buffer.from(canonical), crypto.createPrivateKey(privateKey)).toString("base64")
}

describe("license-crypto", () => {
  it("verify RSA-SHA256 payload", () => {
    const keys = devKeys()
    const payload = { key: "k1", expiresAt: "2099-01-01T00:00:00.000Z" }
    const sig = sign(payload, keys.privateKey)
    expect(verifyRsaSha256(payload, sig, keys.publicKey)).toBe(true)
  })

  it("uses stable canonical bytes", () => {
    const payload = { key: "a", expiresAt: "2099-01-01T00:00:00.000Z" }
    expect(offlinePayloadBytes(payload).toString()).toBe('{"expiresAt":"2099-01-01T00:00:00.000Z","key":"a"}')
  })
})

describe("parseOfflineLicense", () => {
  it("returns null when file missing", () => {
    expect(parseOfflineLicense("", "k")).toBeNull()
  })

  it("accepts RSA-signed license", () => {
    const keys = devKeys()
    const payload = { key: "offline-rsa", expiresAt: "2099-01-01T00:00:00.000Z" }
    const signature = sign(payload, keys.privateKey)
    const file = writeLicense({ ...payload, signature, algorithm: "RSA-SHA256" })
    expect(parseOfflineLicense(file, "offline-rsa", keys.publicKey)?.reason).toBe("offline_rsa")
  })

  it("rejects bad RSA signature", () => {
    const keys = devKeys()
    const file = writeLicense({
      key: "offline-rsa",
      expiresAt: "2099-01-01T00:00:00.000Z",
      signature: Buffer.from("bad").toString("base64"),
    })
    expect(parseOfflineLicense(file, "offline-rsa", keys.publicKey)?.reason).toBe("offline_bad_signature")
  })
})
