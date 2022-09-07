import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Funds__factory } from "../ethereum/typechain/factories/Funds__factory";
import { injected } from "../ethereum/connector";
import { FUND_ADDRESS, PAY_MASTER_ADDRESS } from "../ethereum/const";
import { ethers, providers } from "ethers";
import { RelayProvider, GSNConfig } from "@opengsn/provider";

declare let window: { ethereum: any; location: any };

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React();

  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}

export const switchNetworkMetamask = async (chainIdHex: string) => {
  const { ethereum } = window as any;

  if (ethereum) {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
    } catch (error) {
      console.log("Switch network error", error);
    }
  }
};

export const getProvider = () => {
  const { ethereum } = window as any;
  const provider = new ethers.providers.Web3Provider(ethereum);
  return provider;
};

export const getGsnProvider = () => {
  const { gsnProvider } = window as any;

  return new ethers.providers.Web3Provider(gsnProvider);
};

export const getFunds = () => {
  const provider = getProvider();
  const signer = provider.getSigner();
  const contract = Funds__factory.connect(FUND_ADDRESS, signer);
  return contract;
};

export const getGsnFunds = () => {
  const provider = getGsnProvider();
  const signer = provider.getSigner();
  const contract = Funds__factory.connect(FUND_ADDRESS, signer);
  return contract;
};
