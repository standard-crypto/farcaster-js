import { Eip712Signer, ViemLocalEip712Signer, NobleEd25519Signer } from '@farcaster/core';
import { privateKeyToAccount, mnemonicToAccount } from 'viem/accounts';

export function hexToSigner(signerHex: string): NobleEd25519Signer {
  let privateKeyBytes;
  if (signerHex.startsWith('0x')) {
    privateKeyBytes = hexToBytes(signerHex.slice(2));
  } else {
    privateKeyBytes = hexToBytes(signerHex);
  }
  return new NobleEd25519Signer(privateKeyBytes);
}

export function eip712SignerFromMnemonicPrPrivateKey(mnemonicPrPrivateKey: string): Eip712Signer {
  let account;
  if (mnemonicPrPrivateKey.startsWith('0x')) {
    account = privateKeyToAccount(mnemonicPrPrivateKey as `0x${string}`);
  } else {
    account = mnemonicToAccount(mnemonicPrPrivateKey);
  }
  return new ViemLocalEip712Signer(account);
}

export function hexToBytes(hex: string): Uint8Array {
  if (typeof hex !== 'string') { throw new Error('hex string expected, got ' + typeof hex); }
  const len = hex.length;
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (len % 2) { throw new Error(`padded hex string expected, got un-padded hex of length ${len}`); }
  const array = new Uint8Array(len / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0) { throw new Error('Invalid byte sequence'); }
    array[i] = byte;
  }
  return array;
}
