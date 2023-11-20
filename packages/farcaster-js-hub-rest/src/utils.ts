import { Eip712Signer, EthersEip712Signer, NobleEd25519Signer } from '@farcaster/core';
import { hexToBytes } from '@noble/hashes/utils';
import { Wallet } from 'ethers';

export function hexToSigner(signerHex: string): NobleEd25519Signer {
  const privateKeyBytes = hexToBytes(signerHex.slice(2));
  return new NobleEd25519Signer(privateKeyBytes);
}

export function eip712SignerFromPhrase(mnemonic: string): Eip712Signer {
  const wallet = Wallet.fromPhrase(mnemonic);
  return new EthersEip712Signer(wallet);
}
