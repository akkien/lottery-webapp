import { RelayProvider, GSNConfig } from "@opengsn/provider"
import { PAY_MASTER_ADDRESS, RELAYER_HOST } from "./const"

declare let window: {
  ethereum: any
  location: any
  gsnProvider: RelayProvider
}

export const initGsnProvider = async () => {
  const web3Provider = window.ethereum
  if (web3Provider == null) {
    throw new Error(
      'No "window.ethereum" found. do you have Metamask installed?'
    )
  }

  const gsnConfig: Partial<GSNConfig> = {
    preferredRelays: [RELAYER_HOST],
    loggerConfiguration: { logLevel: "debug" },
    paymasterAddress: PAY_MASTER_ADDRESS,
    performDryRunViewRelayCall: false,
    minMaxPriorityFeePerGas: 1000000000,
  }

  const gsnProvider = RelayProvider.newProvider({
    provider: web3Provider,
    config: gsnConfig,
  })
  await gsnProvider.init()

  window.gsnProvider = gsnProvider
}
