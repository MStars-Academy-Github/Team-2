import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BoltIcon from "@mui/icons-material/Bolt";
import axios from "axios";

export default function Footer({ user }: any) {
  const [value, setValue] = React.useState(0);
  function clearHandler(e: any) {
    console.log(e);
  }

  return (
    <Box sx={{}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <BottomNavigationAction
          label="Clear from List"
          icon={<ClearIcon color="error" />}
          onClick={() => {
            axios.delete(`http://localhost:3001/users/delete?id=${user._id}`);
            window.location.reload();
          }}
        />
        <BottomNavigationAction
          label="Add Star"
          icon={<StarIcon color="info" />}
        />
        <BottomNavigationAction
          label="I like it!"
          icon={<FavoriteIcon color="success" />}
        />
        <BottomNavigationAction
          label="Speed"
          icon={<BoltIcon color="primary" />}
        />
      </BottomNavigation>
    </Box>
  );
}
