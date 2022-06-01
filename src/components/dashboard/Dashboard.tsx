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

import { useWeb3React } from "@web3-react/core";
import { useLotteryFactory, getLottery } from "../../hooks/web3";
import { trimAccount } from "../../ethereum/helper";

import Lottery from "../lottery/Lottery";

function Dashboard() {
  const { account } = useWeb3React();

  const [lotteries, setLotteries] = useState<string[]>([]);
  const [pickedLottery, setPickedLottery] = useState("");

  // Input
  const [lotteryAddrInput, setLotteryAddrInput] = useState("");
  const [paymentToken, setPaymentToken] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");

  const [notiMessage, setNotiMessage] = useState<React.ReactNode>(null);
  const [notiOpen, setNotiOpen] = useState(false);

  const [sending, setSending] = useState(false);

  const handleClickAddress = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    address: string
  ) => {
    setPickedLottery(address);
  };

  const factory = useLotteryFactory();

  const fetchLottery = async () => {
    if (account) {
      const lotteries = await factory.getMyLotteries(account);
      setLotteries(lotteries);
    }
  };

  useEffect(() => {
    fetchLottery();
  }, [account]);

  const handleCloseNoti = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotiOpen(false);
  };

  const handleCreateLottery = async () => {
    const createTx = await factory.createLottery(
      paymentToken,
      ethers.utils.parseEther(price.toString())
    );

    setSending(true);
    try {
      await sendTransaction(createTx);
      fetchLottery();
    } catch (error) {
    } finally {
      setSending(false);
    }
  };

  const handleFindLottery = async () => {
    if (!ethers.utils.isAddress(lotteryAddrInput)) {
      setNotiMessage(<span>Invalid Address</span>);
      setNotiOpen(true);
      return;
    }

    const lottery = getLottery(lotteryAddrInput);

    try {
      await lottery.paymentToken();
      setPickedLottery(lotteryAddrInput);
    } catch (error) {
      setNotiMessage(<span>Invalid Address</span>);
      setNotiOpen(true);
    }
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
      <Grid container justifyContent="center" style={{ marginBottom: "3rem" }}>
        <Grid item container justifyContent="center" direction="column" xs={3}>
          <OutlinedInput
            placeholder="Payment ERC20 Token Address"
            value={paymentToken}
            onChange={(e) => {
              setPaymentToken(e.target.value);
            }}
            style={{ marginBottom: 5 }}
          />
          <OutlinedInput
            placeholder="Bet Price"
            type="number"
            value={price}
            style={{ marginBottom: 5 }}
            onChange={(e) => {
              if (e.target.value === "") {
                setPrice(e.target.value);
              } else {
                setPrice(Number(e.target.value));
              }
            }}
          />
          <Button variant="contained" onClick={handleCreateLottery}>
            {sending ? "Creating..." : "Create Lottery"}
          </Button>
        </Grid>
      </Grid>

      <OutlinedInput
        id="standard-search"
        placeholder="Enter Existing Lottery Address"
        type="search"
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleFindLottery}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        value={lotteryAddrInput}
        onChange={(e) => {
          setLotteryAddrInput(e.target.value);
        }}
      />

      <Grid
        container
        direction="row"
        style={{ marginTop: ".5rem" }}
        spacing={2}
      >
        <Grid item xs={6}>
          <Box
            sx={{
              width: "100%",
              bgcolor: "#f5f5f5",
              borderRadius: 3,
              padding: "3px",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              textAlign="center"
              style={{ margin: 0, paddingTop: ".5rem" }}
            >
              Your Own Lotteries
            </Typography>
            <List component="nav" aria-label="secondary mailbox folder">
              {lotteries.map((item, idx) => (
                <ListItemButton
                  key={idx}
                  selected={pickedLottery === item}
                  onClick={(event) => handleClickAddress(event, item)}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              width: "100%",
              bgcolor: "#f5f5f5",
              borderRadius: 3,
              padding: "8px 16px",
            }}
          >
            {pickedLottery ? (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  textAlign="center"
                  style={{ margin: 0, paddingTop: ".5rem" }}
                >
                  {`Lottery ${pickedLottery ? trimAccount(pickedLottery) : ""}`}
                </Typography>
                <Lottery lotteryAddress={pickedLottery} />
              </>
            ) : (
              <Alert severity="warning">
                Please select one of your lottery or enter a lottery address
              </Alert>
            )}
          </Box>
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
