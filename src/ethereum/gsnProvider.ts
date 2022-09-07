import { RelayProvider, GSNConfig } from "@opengsn/provider";

declare let window: {
  ethereum: any;
  location: any;
  gsnProvider: RelayProvider;
};

export const initGsnProvider = async () => {
  const web3Provider = window.ethereum;
  if (web3Provider == null) {
    throw new Error(
      'No "window.ethereum" found. do you have Metamask installed?'
    );
  }

  const PAY_MASTER_ADDRESS = "0x8A365103441883713d0780d8bb153dCfe2885DD7";

  const gsnConfig: Partial<GSNConfig> = {
    preferredRelays: ["http://188.166.211.138:8080/gsn1"],
    loggerConfiguration: { logLevel: "debug" },
    paymasterAddress: PAY_MASTER_ADDRESS,
    performDryRunViewRelayCall: false,
  };

  const gsnProvider = RelayProvider.newProvider({
    provider: web3Provider,
    config: gsnConfig,
  });
  await gsnProvider.init();

  window.gsnProvider = gsnProvider;
};
