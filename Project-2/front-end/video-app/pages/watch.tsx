import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Button, Divider, TextField } from "@mui/material";
import moment from "moment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Share</DialogTitle>
      <Divider />
      <List className="flex gap-4 p-4">
        <FacebookShareButton url={window.location.href}>
          <FacebookIcon size={50} round />
        </FacebookShareButton>
        <TelegramShareButton url={window.location.href}>
          <TelegramIcon size={50} round />
        </TelegramShareButton>
        <TwitterShareButton url={window.location.href}>
          <TwitterIcon size={50} round />
        </TwitterShareButton>
        <ViberShareButton url={window.location.href}>
          <ViberIcon size={50} round />
        </ViberShareButton>
        <WhatsappShareButton url={window.location.href}>
          <WhatsappIcon size={50} round />
        </WhatsappShareButton>
      </List>
      <TextField className="p-4" defaultValue={window.location.href} />
    </Dialog>
  );
}
export default function watch({ videoDesc }: any) {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>();
  const router = useRouter();
  const { video } = router.query;
  const url = location.href;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const [count, setCount] = useState(0);
  const watchVideo = videoDesc.filter((videos: any) => {
    if (videos._id === video) {
      return videos;
    }
  });
  function handlerOpenVideo(id: any) {
    router.push(`/watch?video=${id}`);
  }

  function handlerLike() {
    videoDesc.filter((a: any, i: number) => {
      if (a.postedBy === user?.user._id) {
        setCount(count + 1);
        window.localStorage.setItem("like", JSON.stringify(count));
      }
    });
  }

  function viewCounter() {
    axios.post(`http://localhost:3001/v1/media/view/${video}`);
  }

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "user"));
  }, []);
  function playlistHandler(id: string) {
    const user = JSON.parse(localStorage.getItem("user") || "user");
    axios.post("http://localhost:3001/v1/users/playlist", {
      userId: user.user._id,
      mediaId: id,
    });
  }

  return (
    <div
      className="p-6 flex gap-4 justify-center "
      style={{ backgroundColor: "#343a40", height: "88vh" }}
    >
      <div>
        <ReactPlayer
          url={`http://localhost:3001/v1/media/video/${video}`}
          controls={true}
          width="60vw"
          height="60vh"
          onEnded={viewCounter}
        />
        <div>
          <p style={{ fontSize: "30px", color: "white" }}>
            {watchVideo[0].title}
          </p>
          <div className="flex justify-between">
            <div style={{ color: "white", display: "flex", gap: "5px" }}>
              <p>Views {watchVideo[0].views}</p>
              &#8226;
              <p>{moment(watchVideo[0].created).format("MMM DD,YYYY")}</p>
            </div>
            <div className="flex">
              <Button className="gap-2" onClick={handlerLike}>
                <ThumbUpIcon /> Like
              </Button>
              <Button className="gap-2">
                <ThumbDownIcon />
                Dislike
              </Button>
              <div>
                <Button onClick={handleClickOpen}>
                  <ShareIcon /> Share
                </Button>
                <SimpleDialog
                  selectedValue={window.location.href}
                  open={open}
                  onClose={handleClose}
                />
              </div>
              <Button className="gap-2">
                <ContentCutIcon />
                Clip
              </Button>
              <Button
                className="gap-2"
                onClick={() => {
                  playlistHandler(watchVideo[0]._id);
                }}
              >
                <WatchLaterIcon />
                Water Later
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto grid grid-cols-1 gap-5 h-[60vh]">
        <div
          style={{
            backgroundColor: "#006c6e",
            textAlign: "center",
            color: "white",
            padding: "10px",
          }}
        >
          Related Videos
        </div>
        {videoDesc.map((video: any, i: number) => {
          return (
            <ReactPlayer
              url={`http://localhost:3001/v1/media/video/${video._id}`}
              controls={true}
              width="20vw"
              height="fit-content"
              onClick={() => handlerOpenVideo(video._id)}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}

watch.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://localhost:3001/v1/media");
  const json = await res.data.data;
  return { videoDesc: json };
};
