import { RelayProvider } from "@opengsn/provider";

export const requestAccount = async () => {};

export function trimAccount(address: string) {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

export const getActualTxHash = async (relayRequestId: string) => {
  const { gsnProvider } = window as any;
  return new Promise<string>((resolve, reject) => {
    (gsnProvider as RelayProvider).send(
      {
        jsonrpc: "2.0",
        method: "eth_getTransactionReceipt",
        params: [relayRequestId],
        id: 0,
      },
      (err, res) => {
        if (err) return reject(err);
        return resolve(res?.result.actualTransactionHash);
      }
    );
  });
};
