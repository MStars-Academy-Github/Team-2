import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Title() {
  const [media, setMedia] = useState([]);
  console.log(media);
  const router = useRouter();
  const { title } = router.query;

  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  useEffect(() => {
    axios
      .get(`http://localhost:3001/v1/media/search/by/${title}`)
      .then((res) => {
        setMedia(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [title]);
  return (
    <div>
      {/* {title} */}
      {media &&
        media.map((video: any) => (
          <ReactPlayer
            url={`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/video/by/${video._id}`}
            width="100%"
            height={"inherit"}
            controls={true}
          />
        ))}
    </div>
  );
}
