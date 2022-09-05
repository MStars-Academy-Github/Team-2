import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import ReactPlayer from "react-player";
import { Button } from "@mui/material";

export default function watch({ videoDesc }: any) {
  console.log(videoDesc);
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
  console.log(watchVideo);
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
      <div>
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
  );
}

watch.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://localhost:3001/v1/media");
  const json = await res.data.data;
  return { videoDesc: json };
};
