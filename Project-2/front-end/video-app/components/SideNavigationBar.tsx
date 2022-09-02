import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";

export default function SideNavigationBar({ user }: any) {
  console.log(user);
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
          style={{ display: "flex", flexDirection: "column", color: "#fffcf2" }}
        >
          <HomeIcon />
          Home
        </Button>
      </Link>
      <Link href={`/profile/${user?._id}`}>
        <Button
          style={{ display: "flex", flexDirection: "column", color: "#fffcf2" }}
        >
          <PersonIcon />
          Profile
        </Button>
      </Link>
      <Link href="/">
        <Button
          style={{ display: "flex", flexDirection: "column", color: "#fffcf2" }}
        >
          <SettingsIcon />
          Settings
        </Button>
      </Link>
    </div>
  );
}
SideNavigationBar.getInitialProps = async () => {
  const user = await JSON.parse(window.localStorage.getItem("user") || "user");
  return { user: user };
};
