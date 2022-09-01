import { Button } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export default function SideNavigationBar() {
  return (
    <div
      style={{
        textAlign: "start",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button>
        <SignalCellularAltIcon />
        DashBoard
      </Button>
      <Button>
        <PersonIcon />
        Profile
      </Button>
      <Button>
        <SettingsIcon />
        Settings
      </Button>
    </div>
  );
}
