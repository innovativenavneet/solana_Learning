//hd wallet stands for Hierarchical Deterministic wallet which means that we can generate multiple private keys from a single seed phrase
//this is used in most of the crypto wallets

//so bip-39 means is a library which can generate random english words pairs 
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';

// Generate a 12-word mnemonic , it takes only 128 and 256 bytes 
const mnemonic = generateMnemonic(128);
console.log('Generated Mnemonic:', mnemonic);

// lets generate a seed from mnemonic so seed is basically a keypair 
const seed = mnemonicToSeedSync(mnemonic);
console.log('Generated Seed:', seed);