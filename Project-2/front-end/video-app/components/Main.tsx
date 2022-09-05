import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Main() {
  const [media, setMedia] = useState();
  console.log(media);

  useEffect(() => {
    axios.get("http://localhost:3001/v1/media").then((res) => {
      setMedia(res.data.data);
    });
  }, []);

  return (
    <>
      <div className="p-2 flex gap-4 ">
        <Button
          variant="outlined"
          color="warning"
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
          color="warning"
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
          color="warning"
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
          color="warning"
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
          color="warning"
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
          color="warning"
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
        <div className="grid grid-cols-4 gap-5"></div>
      </div>
    </>
  );
}
