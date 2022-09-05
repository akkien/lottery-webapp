const { RelayProvider } = require("@opengsn/provider");

let gsnProvider;

console.log("Loaded JS");

async function initGsnProvider() {
  if (!window.ethereum) {
    throw new Error("provider not found");
  }

  window.ethereum.on("accountsChanged", () => {
    console.log("accountsChanged");
    window.location.reload();
  });
  window.ethereum.on("chainChanged", () => {
    console.log("chainChained");
    window.location.reload();
  });

  const PAY_MASTER_ADDRESS = "0x8A365103441883713d0780d8bb153dCfe2885DD7";
  gsnProvider = await RelayProvider.newProvider({
    provider: window.ethereum,
    config: {
      loggerConfiguration: { logLevel: "debug" },
      PAY_MASTER_ADDRESS,
    },
  }).init();
}
