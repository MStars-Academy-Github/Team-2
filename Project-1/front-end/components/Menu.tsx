import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BoltIcon from "@mui/icons-material/Bolt";
import axios from "axios";
import { Button } from "@mui/material";

export default function Menu({ user }: any) {
  const [value, setValue] = React.useState(0);
  const [color, setColor] = React.useState(false);
  const [loggedUser, setLoggedUser] = React.useState<any>();
  React.useEffect(() => {
    setLoggedUser(JSON.parse(window.localStorage.getItem("user") || "user"));
  }, []);
  function classfunc() {
    setColor(true);
  }
  return (
    <Box sx={{}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.0)",
        }}
      >
        <BottomNavigationAction
          style={
            color === true
              ? {
                  color: "green",
                }
              : { color: "red" }
          }
          icon={<ClearIcon />}
          onClick={() => {
            axios.delete(
              `http://localhost:3001/users/delete?id=${loggedUser.data.user._id}&userLike=${user._id}`
            );
            window.location.reload();
          }}
        />
        <BottomNavigationAction icon={<StarIcon color="info" />} />
        <BottomNavigationAction
          style={
            color === true
              ? {
                  color: "red",
                }
              : { color: "green" }
          }
          onClick={classfunc}
          icon={<FavoriteIcon />}
        />

        <BottomNavigationAction icon={<BoltIcon color="primary" />} />
      </BottomNavigation>
    </Box>
  );
}
