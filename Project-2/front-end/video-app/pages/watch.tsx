import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { Button } from "@mui/material";
import moment from "moment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

export default function watch({ videoDesc }: any) {
  const router = useRouter();
  const { video } = router.query;

  function handlerDlt(id: any) {
    axios.delete(`http://localhost:3001/v1/media/delete/${id}`).then((res) => {
      if (res.status === 200) {
        router.push("/");
        alert("ustsan");
      }
    });
  }
  function handlerEditVideo() {
    console.log("handlerEditVideo");
  }
  const watchVideo = videoDesc.filter((videos: any) => {
    if (videos._id === video) {
      return videos;
    }
  });
  function handlerOpenVideo(id: any) {
    router.push(`/watch?video=${id}`);
  }
  console.log(watchVideo);

  return (
    <div
      className="p-6 flex gap-4 justify-center "
      style={{ backgroundColor: "#343a40", height: "100%" }}
    >
      <div>
        <ReactPlayer
          url={`http://localhost:3001/v1/media/video/${video}`}
          controls={true}
          height="70% "
          width="fit-content"
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
              <Button className="gap-2">
                <ThumbUpIcon /> LIKE
              </Button>
              <Button className="gap-2">
                <ThumbDownIcon />
                DISLIKE
              </Button>
              <Button className="gap-2">
                <ShareIcon />
                SHARE
              </Button>
              <Button className="gap-2">
                <ContentCutIcon />
                CLIP
              </Button>
              <Button className="gap-2">
                <WatchLaterIcon />
                WATCH LATER
              </Button>
            </div>
          </div>
          <Button
            sx={{
              color: "white",
              border: "0.2px solid #006c6e",
              width: "200px",
              margin: "10px",
            }}
            variant="outlined"
            onClick={handlerEditVideo}
          >
            Edit
          </Button>
          <Button
            sx={{
              color: "white",
              border: "0.2px solid #006c6e",
              width: "200px",
              margin: "10px",
            }}
            variant="outlined"
            onClick={() => handlerDlt(`${video}`)}
          >
            Delete
          </Button>
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
              width="100%"
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
