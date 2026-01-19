import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

//1. generate a memonics
const memonics = generateMnemonic(128);
console.log("Generated Mnemonic:", memonics);

//2. generate a seed from mnemonic
const seed = mnemonicToSeedSync(memonics);

console.log(seed);

// Looping to generate multiple wallets
for (let i = 0; i < 4; i++) {
  //  m → master seed , 44'→ BIP44 standard  501'→ Solana coin type   i'→ account index  0'→ change (Solana always uses 0)
  const path = `m/44'/501'/${i}'/0'`;

  const derivedSeed = derivePath(path, seed.toString("hex")).key;

  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log(secret);
}
