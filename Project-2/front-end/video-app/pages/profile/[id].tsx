import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Id() {
  const [media, setMedia] = useState<any>([]);
  const router = useRouter();
  const { id } = router.query;
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

  useEffect(() => {
    axios.get(`http://localhost:3001/v1/media/video/by/${id}`).then((res) => {
      setMedia(res.data.data);
    });
  }, [id]);

  return (
    <div
      style={{
        height: "90vh",
        padding: "30px",
        color: "white",
      }}
      className="grid grid-cols-4 gap-4"
    >
      {media.map((video: any, i: number) => {
        return (
          <ReactPlayer
            key={i}
            url={`http://localhost:3001/v1/media/video/${video._id}`}
            controls={true}
            width="100%"
            height="fit-content"
          />
        );
      })}
    </div>
  );
}
