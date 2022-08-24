import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Navbar() {
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

          <Button color="inherit" onClick={logoutHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
