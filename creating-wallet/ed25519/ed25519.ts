import * as ed from "@noble/ed25519"; 

async function main() {
// creating a private key pair 
const Private = ed.utils.randomSecretKey();
console.log("private key ",Private);

//lets encrypt the message and converting it into Uint array 
const message = new TextEncoder().encode("hey i am sending you some money");
console.log("message",message);
const Public = await ed.getPublicKeyAsync(Private);
console.log("public key",Public);
// will sign the message 
const signature = await ed.signAsync(message ,Private);
console.log("signature",signature);
//lets verify singnature 
const isValid = await ed.verifyAsync(signature,message, Public);
console.log("signature is valid", isValid);
}

// to run i can run it with following command : npm run start "message" "seed" "mode"

main();