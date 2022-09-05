import { Button } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";

export default function Main() {
  const router = useRouter();
  const [media, setMedia] = useState<any>([]);
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  console.log(media);
  useEffect(() => {
    axios.get("http://localhost:3001/v1/media").then((res) => {
      setMedia(res.data.data);
    });
  }, []);

  function handlerOpenVideo(id: any) {
    router.push(`/watch?video=${id}`);
  }

  return (
    <>
      <div className="p-4 flex gap-4 justify-around">
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e", width: "200px" }}
          onClick={() => {
            axios.get("http://localhost:3001/v1/media").then((res) => {
              setMedia(res.data.data);
            });
          }}
        >
          All
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e", width: "200px" }}
          onClick={() => {
            axios.get("http://localhost:3001/v1/media/by/music").then((res) => {
              setMedia(res.data.data);
            });
          }}
        >
          Music
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e", width: "200px" }}
          onClick={() => {
            axios
              .get("http://localhost:3001/v1/media/by/animation")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Animation
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e", width: "200px" }}
          onClick={() => {
            axios
              .get("http://localhost:3001/v1/media/by/gaming")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Gaming
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e", width: "200px" }}
          onClick={() => {
            axios
              .get("http://localhost:3001/v1/media/by/entertainment")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Entertainment
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e", width: "200px" }}
          onClick={() => {
            axios
              .get("http://localhost:3001/v1/media/by/comedy")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Comedy
        </Button>
      </div>
      <div
        style={{
          backgroundColor: "#343a40",
          height: "85vh",
          padding: "30px",
        }}
      >
        <div className="grid grid-cols-4 gap-5">
          {media.map((video: any, i: number) => {
            return (
              <div key={i}>
                <ReactPlayer
                  url={`http://localhost:3001/v1/media/video/${video._id}`}
                  controls={true}
                  width="100%"
                  height="fit-content"
                  onClick={() => handlerOpenVideo(video._id)}
                />

                <div className="flex  text-white justify-around m-px">
                  <p>Title:</p>
                  <p>{video.title}</p>
                </div>
                <div className="flex  text-white justify-around m-px">
                  <p>Description:</p>
                  <p>{video.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
