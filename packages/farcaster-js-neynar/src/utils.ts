/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import { mnemonicToAccount } from 'viem/accounts';
import { NeynarAPIClient } from './NeynarAPIClient.js';
import { SignerStatusEnum } from './v2/index.js';

export async function generateSignature(
  publicKey: string,
  appFid: number,
  accountMnemonic: string,
  deadline: number,
): Promise<string> {
  // DO NOT CHANGE ANY VALUES IN THIS CONSTANT
  const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = {
    name: 'Farcaster SignedKeyRequestValidator',
    version: '1',
    chainId: 10,
    verifyingContract:
      '0x00000000fc700472606ed4fa22623acf62c60553' as `0x${string}`,
  };

  // DO NOT CHANGE ANY VALUES IN THIS CONSTANT
  const SIGNED_KEY_REQUEST_TYPE = [
    { name: 'requestFid', type: 'uint256' },
    { name: 'key', type: 'bytes' },
    { name: 'deadline', type: 'uint256' },
  ];

  const account = mnemonicToAccount(accountMnemonic);

  // Generates the signature
  const signature = await account.signTypedData({
    domain: SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN,
    types: {
      SignedKeyRequest: SIGNED_KEY_REQUEST_TYPE,
    },
    primaryType: 'SignedKeyRequest',
    message: {
      requestFid: BigInt(appFid),
      key: publicKey,
      deadline: BigInt(deadline),
    },
  });

  return signature;
}

export function mnemonicToAddress(mnemonic: string): string {
  const account = mnemonicToAccount(mnemonic);
  return account.address;
}

export async function waitForNeynarSignerApproval(client: NeynarAPIClient, signerUuid: string): Promise<void> {
  let signerStatus = SignerStatusEnum.PendingApproval;
  while (signerStatus === SignerStatusEnum.PendingApproval) {
    const signer = await client.v2.fetchSigner(signerUuid);
    if (signer?.status === undefined) {
      break;
    }
    signerStatus = signer.status;
    // wait 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  if (signerStatus === SignerStatusEnum.Approved) {
    console.log('Approved! Now you can start using this signer.');
    console.log(`Signer UUID: ${signerUuid}`);
  } else {
    const signerStatusString: string = signerStatus.toString();
    console.log(`Something went wrong. Signer ${signerUuid} has status ${signerStatusString}`);
  }
}
