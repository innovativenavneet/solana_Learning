import { generateKeyPairSigner } from "@solana/kit";
//this function is tends to generate a key value pair and see how random public keys are being generated in solana ecosystem 

generateKeyPairSigner().then((keyPairSignature) => {
  console.log("Public Key:", keyPairSignature.address);
  console.log("Full object:", keyPairSignature);
});

