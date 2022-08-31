import react, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import NotiContent from "../notify-content/NotifyContent";
import { ContractTransaction } from "@ethersproject/contracts";
import Snackbar from "@mui/material/Snackbar";
import { ethers } from "ethers";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useWeb3React } from "@web3-react/core";
import { getFunds } from "../../hooks/web3";
import { trimAccount } from "../../ethereum/helper";

const abiCoder = new ethers.utils.AbiCoder();

const getHash = (str: string, num: number) => {
  return ethers.utils.keccak256(
    abiCoder.encode(["string", "uint"], [str, num])
  );
};

function Dashboard() {
  const { account } = useWeb3React();

  const fundsContract = getFunds();

  // Input
  const [isRegistered, setIsRegistered] = useState(false);
  const [topUpSecret, setTopUpSecret] = useState("");
  const [topUpNumber, setTopUpNumber] = useState<number | string>("");
  const [claimSecret, setClaimSecret] = useState("");
  const [claimNumber, setClaimNumber] = useState<number | string>("");

  const [notiMessage, setNotiMessage] = useState<React.ReactNode>(null);
  const [notiOpen, setNotiOpen] = useState(false);

  const [sending, setSending] = useState(false);

  useEffect(() => {
    const func = async () => {
      if (claimSecret && claimNumber !== "") {
        const hash = getHash(claimSecret, Number(claimNumber));
        const claimer = await fundsContract.claimers(hash);

        setIsRegistered(claimer !== ethers.constants.AddressZero);
      }
    };
    func();
    console.log("RUN");
  }, [claimNumber, claimSecret]);

  const handleClickTopUp = async () => {
    try {
      const amount = await fundsContract.amount();

      if (topUpSecret && topUpNumber !== "") {
        const hash = getHash(topUpSecret, Number(topUpNumber));
        const tx = await fundsContract.topUp([hash], { value: amount });
        await sendTransaction(tx);
      }
    } catch (error) {
    } finally {
      setSending(false);
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

  if (!account) return null;

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid item xs={8}>
            <OutlinedInput
              placeholder="Secret"
              value={topUpSecret}
              fullWidth
              onChange={(e) => {
                setTopUpSecret(e.target.value);
              }}
              style={{ marginBottom: 5 }}
            />
          </Grid>
          <Grid item xs={8}>
            <OutlinedInput
              placeholder="Random Number"
              type="number"
              value={topUpNumber}
              fullWidth
              style={{ marginBottom: 5 }}
              onChange={(e) => {
                if (e.target.value === "") {
                  setTopUpNumber(e.target.value);
                } else {
                  setTopUpNumber(Number(e.target.value));
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleClickTopUp}>
              {sending ? "Sending..." : "Top Up User"}
            </Button>
          </Grid>
        </Grid>

        {/* USER SECTION */}
        <Grid item xs={6}>
          <Grid item xs={8}>
            <OutlinedInput
              placeholder="Secret"
              value={claimSecret}
              fullWidth
              onChange={(e) => {
                setClaimSecret(e.target.value);
              }}
              style={{ marginBottom: 5 }}
            />
          </Grid>
          <Grid item xs={8}>
            <OutlinedInput
              placeholder="Random Number"
              type="number"
              value={claimNumber}
              fullWidth
              style={{ marginBottom: 5 }}
              onChange={(e) => {
                if (e.target.value === "") {
                  setClaimNumber(e.target.value);
                } else {
                  setClaimNumber(Number(e.target.value));
                }
              }}
            />
          </Grid>{" "}
          <Grid
            item
            xs={8}
            container
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Button variant="contained" onClick={handleClickTopUp}>
              {sending ? "Sending..." : "Register"}
            </Button>

            <ChevronRightIcon />

            <Button variant="contained" onClick={handleClickTopUp}>
              {sending ? "Sending..." : "Claim"}
            </Button>
          </Grid>
        </Grid>
      </Grid>

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
    </div>
  );
}

export default Dashboard;
