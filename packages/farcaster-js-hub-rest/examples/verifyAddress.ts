import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const signerPrivateKey = '0x...';
const fid = 111;
const verifiedAddressMnemonic = 'the mnemonic or private key for your address to verify';
const client = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });

const followResponse = await client.submitVerification({ verifiedAddressMnemonicOrPrivateKey: verifiedAddressMnemonic, verificationType: 'EOA', network: 'MAINNET', chainId: 0 }, fid, signerPrivateKey);
console.log(`follow hash: ${followResponse?.hash}`);
