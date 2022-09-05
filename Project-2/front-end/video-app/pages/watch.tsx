import { useRouter } from "next/router";
import React from "react";
import ReactPlayer from "react-player";

export default function watch() {
  const router = useRouter();
  const { video } = router.query;
  console.log(video);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#343a40",
      }}
    >
      <ReactPlayer url={`${video}`} width="60vw" height="30vw" />
    </div>
  );
}
