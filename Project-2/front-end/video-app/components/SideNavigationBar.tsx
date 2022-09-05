import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SideNavigationBar() {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user") || "user"));
  }, []);
  return (
    <div
      style={{
        textAlign: "start",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "1px 1px 20px rgba(0,0,0,0.2)",
      }}
    >
      <Link href="/">
        <Button
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#fffcf2",
            marginTop: "5px",
          }}
        >
          <HomeIcon />
          Home
        </Button>
      </Link>
      <Link href={`/profile/${user?.user._id}`}>
        <Button
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#fffcf2",
            marginTop: "10px",
          }}
        >
          <PersonIcon />
          Profile
        </Button>
      </Link>
      <Link href={`/edit/${user?.user._id}`}>
        <Button
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#fffcf2",
            marginTop: "10px",
          }}
        >
          <SettingsIcon />
          Edit Profile
        </Button>
      </Link>
    </div>
  );
}
