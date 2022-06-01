import react, { useEffect, useState, forwardRef } from "react";

import { formatEther } from "@ethersproject/units";
import Grid from "@mui/material/Grid";
import { useWeb3React } from "@web3-react/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import OutlinedInput from "@mui/material/OutlinedInput";

import { useLottery, useERC20, useProvider } from "../../hooks/web3";
import { BigNumber } from "@ethersproject/bignumber";
import React from "react";
import { ContractTransaction } from "@ethersproject/contracts";
import { ethers } from "ethers";
import NotiContent from "../notify-content/NotifyContent";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface LotteryProps {
  lotteryAddress: string;
}

function Lottery(props: LotteryProps) {
  const { lotteryAddress } = props;

  const { account } = useWeb3React();

  // Lottery Info
  const [owner, setOwner] = useState("");
  const [paymentToken, setPaymentToken] = useState("");
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const [winNumber, setWinNumber] = useState<number | "">("");
  const [ended, setEnded] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [userBet, setUserBet] = useState<BigNumber>(BigNumber.from(-1));
  const [lotteryBalance, setLotteryBalance] = useState<BigNumber>(
    BigNumber.from(0)
  );

  // Erc20 Info
  const [symbol, setSymbol] = useState("");
  const [allowance, setAllowance] = useState<BigNumber>(BigNumber.from(0));
  const [userBalance, setUserBalance] = useState<BigNumber>(BigNumber.from(0));

  // Input
  const [betNumber, setBetNumber] = useState<number | "">("");

  const [notiMessage, setNotiMessage] = useState<React.ReactNode>(null);
  const [notiOpen, setNotiOpen] = useState(false);

  const [sendingApprove, setSendingApprove] = useState(false);
  const [sendingBet, setSendingBet] = useState(false);
  const [sendingStop, setSendingStop] = useState(false);

  const lottery = useLottery(lotteryAddress);

  const getLotteryInfo = () => {
    Promise.all([
      lottery.paymentToken(),
      lottery.price(),
      lottery.winNumber(),
      lottery.ended(),
      lottery.owner(),
      lottery.getBalance(),
    ])
      .then((info) => {
        setPaymentToken(info[0]);
        setPrice(info[1]);
        setWinNumber(info[2].toNumber());
        setEnded(info[3]);
        setOwner(info[4]);
        setLotteryBalance(info[5]);
      })
      .catch((error) => {
        console.log("Get Lottery Info Fail:", error);
      });
  };
  useEffect(() => {
    getLotteryInfo();
  }, [lotteryAddress]);

  const getUserBet = async () => {
    if (account) {
      const isPlayer = await lottery.isPlayers(account);
      setIsPlayer(isPlayer);

      const userBet = await lottery.betNumber(account);
      setUserBet(userBet);
    }
  };
  useEffect(() => {
    getUserBet();
  }, [account, lotteryAddress]);

  const erc20 = useERC20(paymentToken);
  const getAllowance = async () => {
    if (account) {
      Promise.all([
        erc20.allowance(account, lotteryAddress),
        erc20.balanceOf(account),
        erc20.symbol(),
      ])
        .then((info) => {
          setAllowance(info[0]);
          setUserBalance(info[1]);
          setSymbol(info[2]);
        })
        .catch((error) => {
          console.log("Get Token Info Fail:", error);
        });
    }
  };
  useEffect(() => {
    getAllowance();
  }, [paymentToken, account, lotteryAddress]);

  const approveToken = async () => {
    const approveTx = await erc20.approve(lotteryAddress, price);

    setSendingApprove(true);
    try {
      await sendTransaction(approveTx);
      getAllowance();
    } catch (error) {
    } finally {
      setSendingApprove(false);
    }
  };

  const handleBet = async () => {
    const approveTx = await lottery.bet(ethers.BigNumber.from(betNumber));

    setSendingBet(true);
    try {
      await sendTransaction(approveTx);
      getUserBet();
    } catch (error) {
    } finally {
      setSendingBet(false);
    }
  };

  const handleStop = async () => {
    const stopTx = await lottery.adminStop();

    setSendingStop(true);
    try {
      await sendTransaction(stopTx);
      getLotteryInfo();
    } catch (error) {
    } finally {
      setSendingStop(false);
    }
  };

  const handleCloseNoti = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotiOpen(false);
  };

  const sendTransaction = async (tx: ContractTransaction) => {
    setNotiMessage(NotiContent("Transaction sent", tx.hash));

    try {
      const receipt = await tx.wait();
      if (receipt.status) {
        setNotiMessage(NotiContent("Transaction success", tx.hash));
      } else {
        setNotiMessage(NotiContent("Transaction fail", tx.hash));
      }
    } catch (err) {
      setNotiMessage(<span>Error sending transaction</span>);
    } finally {
      setNotiOpen(true);
    }
  };

  return (
    <>
      <InfoItem
        label="Creator"
        value={owner === account ? `${owner} (You)` : owner}
      />
      <InfoItem label="Is Ended" value={ended ? "Yes" : "No"} />
      <InfoItem label="Win Number" value={winNumber} />
      <br />
      <InfoItem label="Payment Token" value={`${paymentToken} (${symbol})`} />
      <InfoItem
        label="Bet Price"
        value={`${price ? parseFloat(formatEther(price)) : price} (${symbol})`}
      />
      {isPlayer && (
        <InfoItem label="Your Bet Number" value={userBet.toNumber()} />
      )}
      <br />
      <InfoItem
        label="Lottery Balance"
        value={`${
          lotteryBalance
            ? parseFloat(formatEther(lotteryBalance))
            : lotteryBalance
        } (${symbol})`}
      />
      <InfoItem
        label="Your Balance"
        value={`${
          userBalance ? parseFloat(formatEther(userBalance)) : userBalance
        } (${symbol})`}
      />

      {account === owner && !ended && (
        <Grid container justifyContent="center">
          <Button variant="contained" onClick={handleStop}>
            {sendingStop ? "Stopping Lottery..." : "Stop Lottery"}
          </Button>
        </Grid>
      )}
      {account !== owner && (
        <div>
          {!isPlayer && allowance.lt(price) && (
            <Grid
              container
              justifyContent="center"
              style={{ marginBottom: ".5rem" }}
            >
              <Button variant="contained" onClick={approveToken}>
                {sendingApprove ? (
                  "Approving..."
                ) : (
                  <div>
                    {`Approve lottery to use ${
                      price ? parseFloat(formatEther(price)) : price
                    } token`}
                    <br />
                    <small>This action is required so that you can bet</small>
                  </div>
                )}
              </Button>
            </Grid>
          )}
          {!isPlayer && (
            <Grid container justifyContent="center">
              <OutlinedInput
                id="standard-search"
                placeholder="Enter Number"
                type="number"
                value={betNumber}
                disabled={allowance.lt(price)}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setBetNumber(e.target.value);
                  } else {
                    setBetNumber(Number(e.target.value));
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleBet}
                disabled={allowance.lt(price)}
              >
                {sendingBet ? "Betting..." : "Bet"}
              </Button>
            </Grid>
          )}
        </div>
      )}

      <Snackbar
        open={notiOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={handleCloseNoti}
      >
        <Alert
          onClose={handleCloseNoti}
          severity="success"
          sx={{ width: "100%" }}
        >
          {notiMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

interface InfoItemProps {
  label: string;
  value: any;
}
function InfoItem(props: InfoItemProps) {
  const { label, value } = props;
  return (
    <Grid container style={{ margin: "10px 0" }}>
      <Grid item xs={3}>
        <span>{label}:</span>
      </Grid>
      <Grid item xs={3}>
        {value}
      </Grid>
    </Grid>
  );
}

export default Lottery;
