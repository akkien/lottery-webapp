const { RelayProvider } = require("@opengsn/provider");

async function initGsnProvider() {
  if (!window.ethereum) {
    throw new Error("provider not found");
  }

  const PAY_MASTER_ADDRESS = "0x8A365103441883713d0780d8bb153dCfe2885DD7";
  window.gsnProvider = await RelayProvider.newProvider({
    provider: window.ethereum,
    config: {
      preferredRelays: ["http://188.166.211.138:8080/gsn1"],
      loggerConfiguration: { logLevel: "debug" },
      paymasterAddress: PAY_MASTER_ADDRESS,
      performDryRunViewRelayCall: false,
    },
  }).init();
}

window.app = {
  initGsnProvider,
};
