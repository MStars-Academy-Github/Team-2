import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Playlist() {
  const [user, setUser] = useState<any>();
  const [media, setMedia] = useState<any>();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "user"));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/v1/users/${user?.user._id}`)
      .then((res) => {
        setMedia(res.data.data.playlist);
      });
  }, [user]);

  return (
    <div className="grid grid-cols-4">
      {media?.map((video: any, i: number) => {
        return (
          <div key={i}>
            <ReactPlayer
              url={`http://localhost:3001/v1/media/video/${video}`}
              controls={true}
              width="20vw"
              height="20vh"
            />
          </div>
        );
      })}
    </div>
  );
}
