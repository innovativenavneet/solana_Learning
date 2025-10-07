// Import dependencies
const crypto = require("crypto");           // Built-in Node.js crypto module (for ECDSA)
const nacl = require("tweetnacl");          // Lightweight library for Ed25519
const { encodeUTF8, decodeUTF8 } = require("tweetnacl-util"); // Helpers for string <-> byte conversions

// ---------------------
// 1. Command-line inputs
// ---------------------
// Example run: node Ed25519.js "Hello" "seed" "2"
// argv[2] = message, argv[3] = seed, argv[4] = mode
let message = process.argv[2] || "Hello";   // Default = "Hello"
let seed = process.argv[3] || "Goodbye";    // Default = "Goodbye"
let mode = process.argv[4] || "0";          // Default = mode 0 (ECDSA P-256)

let msgBytes = decodeUTF8(message);         // Convert message string → byte array (needed for Ed25519)

// ---------------------
// 2. MODE 0 → ECDSA with P-256 (SHA-256)
// ---------------------
if (mode === "0") {
  // Generate a random ECDSA key pair using the P-256 curve
  const keyPair = crypto.generateKeyPairSync("ec", {
    namedCurve: "P-256", // NIST secp256r1
  });

  // Create a signature object for SHA-256
  const sign = crypto.createSign("SHA256");
  sign.update(message);  // Add the message
  sign.end();
  const signature = sign.sign(keyPair.privateKey); // Sign using the private key

  // Verify signature using the public key
  const verify = crypto.createVerify("SHA256");
  verify.update(message);
  verify.end();
  const verified = verify.verify(keyPair.publicKey, signature);

  // Print results
  console.log("Message:\t", message);
  console.log("Method:\tECDSA P-256 (SHA256)");
  console.log("Priv:\t", keyPair.privateKey.export({ type: "pkcs8", format: "pem" })); // Export private key in PEM format
  console.log("Signature:\t", signature.toString("hex")); // Signature in hex
  console.log("Verified:\t", verified);

// ---------------------
// 3. MODE 1 → ECDSA with P-521 (SHA-512)
// ---------------------
} else if (mode === "1") {
  // Generate a random ECDSA key pair using the P-521 curve
  const keyPair = crypto.generateKeyPairSync("ec", {
    namedCurve: "P-521", // NIST secp521r1
  });

  // Create a signature object for SHA-512
  const sign = crypto.createSign("SHA512");
  sign.update(message);
  sign.end();
  const signature = sign.sign(keyPair.privateKey);

  // Verify signature using the public key
  const verify = crypto.createVerify("SHA512");
  verify.update(message);
  verify.end();
  const verified = verify.verify(keyPair.publicKey, signature);

  // Print results
  console.log("Message:\t", message);
  console.log("Method:\tECDSA P-521 (SHA512)");
  console.log("Priv:\t", keyPair.privateKey.export({ type: "pkcs8", format: "pem" }));
  console.log("Signature:\t", signature.toString("hex"));
  console.log("Verified:\t", verified);

// ---------------------
// 4. MODE 2 → Ed25519 (deterministic from seed)
// ---------------------
} else if (mode === "2") {
  // Convert the seed into a 32-byte Uint8Array
  let seedBytes = new Uint8Array(32);
  Buffer.from(seed).copy(seedBytes); // Pad/truncate seed to exactly 32 bytes

  // Generate Ed25519 key pair deterministically from the seed
  const keyPair = nacl.sign.keyPair.fromSeed(seedBytes);

  // Sign the message (detached = only the signature, not message+signature)
  let signature = nacl.sign.detached(msgBytes, keyPair.secretKey);
``
  // Verify the signature using the public key
  let verified = nacl.sign.detached.verify(msgBytes, signature, keyPair.publicKey);

  // Print results
  console.log("Message:\t", message);
  console.log("Seed:\t", seed);
  console.log("Method:\tEd25519");
  console.log("Priv:\t", Buffer.from(keyPair.secretKey).toString("hex")); // Secret key in hex (contains private + public part)
  console.log("Signature:\t", Buffer.from(signature).toString("hex"));   // Signature in hex
  console.log("Verified:\t", verified);
}
