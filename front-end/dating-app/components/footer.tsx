import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BoltIcon from "@mui/icons-material/Bolt";

export default function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 600, marginBottom: "30vh" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Next One"
          icon={<RefreshIcon color="warning" />}
        />
        <BottomNavigationAction
          label="Clear from List"
          icon={<ClearIcon color="error" />}
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
