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

import { useWeb3React } from "@web3-react/core";
import { useLotteryFactory } from "../../hooks/web3";

import Lottery from "../lottery/Lottery";

function Dashboard() {
  const { account } = useWeb3React();

  const [lotteries, setLotteries] = useState<string[]>([]);
  const [pickedLottery, setPickedLottery] = useState("");

  const handleClickAddress = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    address: string
  ) => {
    setPickedLottery(address);
  };

  const factory = useLotteryFactory();

  useEffect(() => {
    const fetchLottery = async () => {
      const lotteries = await factory.getMyLotteries(
        "0x6c227E1743c700bA685D69fBF1a01AeE249d3803"
      );
      setLotteries(lotteries);
    };
    fetchLottery();
  }, []);

  if (!account) return null;

  return (
    <div>
      <OutlinedInput
        id="standard-search"
        placeholder="Enter Lottery Address"
        type="search"
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {}}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />

      <Grid container justifyContent="center" style={{ marginTop: "1rem" }}>
        <Button variant="contained" onClick={() => {}}>
          Create Lottery
        </Button>
      </Grid>
      <Grid container direction="row" style={{ marginTop: "2rem" }} spacing={2}>
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
              Your Own Lottery
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
                  {`Lottery`}
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
    </div>
  );
}

export default Dashboard;
