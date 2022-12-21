import {
  MerkleAPIClient,
  isApiErrorResponse,
} from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

// init
const wallet = Wallet.fromMnemonic("twelve words here");
const apiClient = new MerkleAPIClient(wallet);

// parse an error response from the API server
try {
  await apiClient.deleteCast("SomeInvalidCastHash");
} catch (error) {
  if (isApiErrorResponse(error)) {
    const apiErrors = error.response.data.errors;
    for (const apiError of apiErrors) {
      console.log(`API Error: ${apiError.message}`);
    }

    console.log(`Status code: ${error.response.status}`);
  }
}
