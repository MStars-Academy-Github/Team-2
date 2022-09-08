import { Avatar, Button } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Playlist() {
  const [user, setUser] = useState<any>();
  const [playlist, setPlaylist] = useState<any>();
  const [users, setUsers] = useState<any>([]);
  const [media, setMedia] = useState<any>();

  const router = useRouter();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "user"));
    axios.get("http://35.160.145.172:3001/v1/users").then((res) => {
      setUsers(res.data.data);
    });
    axios.get("http://35.160.145.172:3001/v1/media").then((res) => {
      setMedia(res.data.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`http://35.160.145.172:3001/v1/users/${user?.user._id}`)
      .then((res) => {
        setPlaylist(res.data.data.playlist);
      });
  }, [user]);

  function handlerOpenVideo(id: any) {
    router.push(`/watch?video=${id}`);
  }

  function removeFromPlaylist(id: any) {
    axios
      .post("http://35.160.145.172:3001/v1/users/removeplaylist", {
        userId: user.user._id,
        mediaId: id,
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
  }

  return (
    <div className="grid grid-cols-4 gap-5 p-[30px]">
      {playlist?.map((video: any, i: number) => {
        return (
          <div key={i}>
            <ReactPlayer
              url={`http://35.160.145.172:3001/v1/media/video/${video}`}
              controls={true}
              width="100%"
              height="20vh"
              onClick={() => handlerOpenVideo(video)}
            />
            <div className="text-white w-full">
              <div className="flex items-start p-2 gap-2 w-full">
                <div className="w-full">
                  {media?.map((videoInfo: any) => {
                    if (videoInfo._id === video) {
                      {
                        return users.map((user: any, i: number) => {
                          if (user._id === videoInfo.postedBy) {
                            return (
                              <div
                                className="flex justify-between items-center w-full"
                                key={i}
                              >
                                <div className="flex gap-3" key={i}>
                                  <Avatar
                                    alt="Remy Sharp"
                                    style={{
                                      backgroundColor:
                                        "rgb(" +
                                        Math.floor(Math.random() * 255) +
                                        "," +
                                        Math.floor(Math.random() * 255) +
                                        "," +
                                        Math.floor(Math.random() * 255) +
                                        ")",
                                    }}
                                  >
                                    {user.firstName.slice(0, 1)}
                                  </Avatar>
                                  <div>
                                    <p style={{ fontSize: "18px" }}>
                                      {videoInfo.title}
                                    </p>

                                    <p className="text-gray-400 text-[14px] flex items-center">
                                      {user.firstName}

                                      <CheckCircleIcon
                                        className="text-[14px] ml-1"
                                        color="info"
                                      />
                                    </p>
                                    <p className="text-gray-400 text-[14px]">
                                      Views {videoInfo.views} &#8226;{" "}
                                      {moment(videoInfo.created).format(
                                        "MMM DD,YYYY"
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="contained"
                                  className="h-[50%] bg-red-500"
                                  onClick={() => {
                                    removeFromPlaylist(video);
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            );
                          }
                        });
                      }
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
