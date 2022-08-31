import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { AbstractConnector } from "@web3-react/abstract-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import Alert from "@mui/material/Alert";
import { injected } from "../../ethereum/connector";
import {
  useEagerConnect,
  useInactiveListener,
  switchNetworkMetamask,
} from "../../hooks/web3";
import { formatEther } from "@ethersproject/units";
import { trimAccount } from "../../ethereum/helper";

function ConnectButton() {
  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] =
    useState<AbstractConnector>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // Balance
  const [balance, setBalance] = useState();
  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(undefined);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  const currentConnector = injected;
  const activating = currentConnector === activatingConnector;
  const connected = currentConnector === connector;
  const disabled = !triedEager || !!activatingConnector || connected || !!error;

  if (account) {
    return (
      <div style={{ display: "flex" }}>
        <Alert severity="success" color="info" icon={false}>
          {`${trimAccount(account)} (${
            !!balance ? parseFloat(formatEther(balance)).toPrecision(4) : ""
          } ASA)`}
        </Alert>
        <Button
          variant="contained"
          onClick={() => {
            deactivate();
          }}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  if (error instanceof UnsupportedChainIdError) {
    return (
      <Button
        variant="contained"
        onClick={() => {
          switchNetworkMetamask("0x2b6b");
        }}
      >
        Switch Network
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      //disabled={disabled}
      onClick={() => {
        setActivatingConnector(currentConnector);
        activate(currentConnector);
      }}
    >
      Connect Wallet
    </Button>
  );
}

export default ConnectButton;
