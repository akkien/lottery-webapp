import React from "react";
import ConnectButton from "./components/wallet/ConnectButton";
import Alert from "@mui/material/Alert";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { AbstractConnector } from "@web3-react/abstract-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network (Astra).";
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

function App() {
  const { chainId, account, error } = useWeb3React();

  return (
    <div className="App">
      <div className="app-header">
        <span></span>
        <ConnectButton />
      </div>
      {!!error && <Alert severity="warning">{getErrorMessage(error)}</Alert>}
      {!account ? (
        <div>
          <Alert severity="warning">
            Please connect your wallet to use this application
          </Alert>
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
