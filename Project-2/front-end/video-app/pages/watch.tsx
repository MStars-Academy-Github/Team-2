import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import ReactPlayer from "react-player";
import {
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Key } from "@mui/icons-material";

export default function watch({ videoDesc }: any) {
  const [open, setOpen] = React.useState(false);
  const [dltUpdate, setDltUpdate] = React.useState(false);
  const [user, setUser] = React.useState<any>();
  console.log(user);
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "user"));
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { video } = router.query;

  return (
    <div
      className="p-6"
      style={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // backgroundColor: "#343a40",
      }}
    >
      <ReactPlayer
        url={`http://localhost:3001/v1/media/video/${video}`}
        controls={true}
        width="70%"
        height="fit-content"
      />
    </div>
  );
}

watch.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://localhost:3001/v1/media");
  const json = await res.data.data;
  return { videoDesc: json };
};
