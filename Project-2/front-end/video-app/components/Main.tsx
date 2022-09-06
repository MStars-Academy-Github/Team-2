import { Button } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";

const genre = ["Music", "Animation", "Gaming", "Entertainment", "Comedy"];
export default function Main() {
  const router = useRouter();
  const [media, setMedia] = useState<any>([]);
  useEffect(() => {
    axios.get("http://localhost:3001/v1/media").then((res) => {
      setMedia(res.data.data);
    });
  }, []);
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  function handlerOpenVideo(id: any) {
    router.push(`/watch?video=${id}`);
  }

  return (
    <>
      <div className="p-4 flex gap-4">
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
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
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
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
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
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
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
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
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
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
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
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

                <div className="text-white ">
                  <div className="flex items-start p-2 gap-2">
                    <img src="/favicon.ico" alt="" width="40px" />
                    <div>
                      <p style={{ fontSize: "18px" }}>{video.title}</p>
                      <p className="text-gray-400 text-[14px]">
                        Views {video.views} &#8226;{" "}
                        {moment(video.created).format("MMM DD,YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
