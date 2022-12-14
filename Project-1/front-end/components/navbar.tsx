import * as React from "react";
import { Button, Typography, Toolbar, Box, AppBar } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
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
          <div style={{ width: "10vw" }}></div>
          <Typography
            variant="h6"
            component="div"
            onClick={() => {
              router.push("/");
            }}
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
          <FormControl style={{ width: "10vw" }} color="error">
            <InputLabel id="labelForEmail" color="error">
              {user?.data.email}
            </InputLabel>
            <Select
              value={user?.data.email}
              labelId="labelForEmail"
              style={{ backgroundColor: "white" }}
              variant="filled"
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
