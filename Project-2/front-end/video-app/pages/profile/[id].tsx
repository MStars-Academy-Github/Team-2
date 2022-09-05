import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Id() {
  const [media, setMedia] = useState<any>();
  const [user, setUser] = useState<any>();
  const [video, setVideo] = useState<any>();
  const router = useRouter();
  const { id } = router.query;
  let videos: any = [];

  useEffect(() => {
    axios
      .get(`http://localhost:3001/v1/media/video/by/${id}`)
      .then(async (res) => {
        await setMedia(res.data.data);
        await res.data.data.map((video: any) => {
          axios
            .get(`http://localhost:3001/v1/media/video/${video._id}`)
            .then(async (res) => {
              await videos.push(res.data);
              await setVideo(videos);
            });
        });
      });

    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") || "user"));
    }
  }, [id]);

  console.log(media);
  console.log(video);

  return (
    <div
      style={{
        backgroundColor: "#343a40",
        height: "90vh",
        padding: "30px",
        color: "white",
      }}
    >
      <div>
        <h1>
          {user?.user.firstName} {user?.user.lastName}
        </h1>
      </div>
      {video?.map((e: any) => {
        console.log(e.file[0]);
      })}
    </div>
  );
}
