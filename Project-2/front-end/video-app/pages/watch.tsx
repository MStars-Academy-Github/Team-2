import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "@mui/material";
import moment from "moment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

export default function watch({ videoDesc }: any) {
  const [user, setUser] = React.useState<any>();
  const router = useRouter();
  const { video } = router.query;

  const [count, setCount] = useState(0);
  console.log(count);
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
  console.log(user);
  // console.log(video);
  // console.log(videoDesc);
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "user"));
  }, []);

  return (
    <div
      className="p-6 flex gap-4 justify-center "
      style={{ backgroundColor: "#343a40", height: "100%" }}
    >
      <div>
        <ReactPlayer
          url={`http://localhost:3001/v1/media/video/${video}`}
          controls={true}
          width="60vw"
          height="60vh"
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
            <div>
              <Button className="gap-2" onClick={handlerLike}>
                <ThumbUpIcon /> Like
              </Button>
              <Button className="gap-2">
                <ThumbDownIcon />
                Dislike
              </Button>
              <Button className="gap-2">
                <ShareIcon />
                Share
              </Button>
              <Button className="gap-2">
                <ContentCutIcon />
                Clip
              </Button>
              <Button className="gap-2">
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
