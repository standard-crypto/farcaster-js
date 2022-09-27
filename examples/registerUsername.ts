import { Wallet } from "@ethersproject/wallet";
import { UserRegistry } from "@standard-crypto/farcaster-js";
import { AlchemyProvider } from "@ethersproject/providers";

const provider = new AlchemyProvider("goerli");
const ownerWallet = Wallet.fromMnemonic("twelve words here");
const recoveryWalletAddress = "0x...";
const userRegistry = new UserRegistry(provider);
const usernameToRegister = "new-username";

// Send transaction to pre-commit to this username
const { tx, nonce } = await userRegistry.commitToUsername(
  usernameToRegister,
  ownerWallet.address,
  recoveryWalletAddress,
  ownerWallet
);
await tx.wait;

// Transaction mined. Waiting at least 60s for eligibility to register
await new Promise((resolve) => setTimeout(resolve, 75000));

// Attempt to claim reserved username
await userRegistry.registerUsername(
  usernameToRegister,
  ownerWallet.address,
  recoveryWalletAddress,
  nonce,
  ownerWallet
);
