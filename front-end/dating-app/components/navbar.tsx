import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Navbar() {
  const [user, setUser] = React.useState<any>();
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "user"));
  }, []);
  function logoutHandler(e: any) {
    e.preventDefault();
    window.localStorage.removeItem("user");
    window.location.reload();
  }
  return (
    <Box sx={{ flexGrow: 1, width: "100vw" }} style={{}}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "white",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              textShadow: "1px 1px black",
              fontSize: "25px",
              fontWeight: "900",
            }}
          >
            Dating App
          </Typography>
          <FormControl style={{ minWidth: "10vw" }} color="error">
            <InputLabel id="labelForEmail" color="error">
              {user?.data.email}
            </InputLabel>
            <Select
              value={user?.data.email}
              labelId="labelForEmail"
              style={{ backgroundColor: "white" }}
              variant="outlined"
              color="error"
            >
              <MenuItem>
                <Button color="success" href="/myprofile">
                  Edit profile
                </Button>
              </MenuItem>
              <MenuItem>
                <Button color="error" onClick={logoutHandler}>
                  Logout
                </Button>
              </MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
