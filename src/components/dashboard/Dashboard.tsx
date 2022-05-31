import react from "react";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import { useWeb3React } from "@web3-react/core";

function Dashboard() {
  const { account } = useWeb3React();

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
      <Grid container direction="row" style={{ marginTop: "2rem" }}>
        <Grid item xs={6}>
          HELLO
        </Grid>
        <Grid item xs={6}>
          HELO
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
