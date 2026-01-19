import { Keypair } from "@solana/web3.js";
// the nacl library is a lightweight library for ed25519 cryptography.
import nacl from "tweetnacl";
// The bs58 library provides simple functions to encode binary data (typically as a Buffer or Uint8Array in JavaScript) into
import bs58 from "bs58";

//this key pair will generate a random public and private key pair 
const keypair = Keypair.generate();
console.log("keypair", keypair);

// Public key as base58 string (for display)
const publicKeyBase58 = keypair.publicKey.toBase58();
console.log("public key (base58):", publicKeyBase58);

// Public key as raw bytes (for nacl verification)
const publicKeyBytes = keypair.publicKey.toBytes();

const publicKeyStrings = keypair.publicKey.toString();
console.log("public key (string):", publicKeyStrings);
// Secret key is already a Uint8Array (64 bytes: 32 private + 32 public)
// Convert to base58 for display
const privateKeyBase58 = bs58.encode(keypair.secretKey);
// console.log("private key (base58):", privateKeyBase58);
// console.log("private key (raw bytes):", keypair.secretKey);

const message = new TextEncoder().encode("hey i am navneet");
const message2 = new TextEncoder().encode("hey i am navnee");
// Sign the message using the secretKey (nacl expects Uint8Array)
const signature = nacl.sign.detached(message, keypair.secretKey);
console.log("signature:", signature);

// Verify signature using public key bytes (nacl expects Uint8Array, not base58 string)
const result = nacl.sign.detached.verify(message2, signature, publicKeyBytes);
console.log("verification result:", result);









