import { useRouter } from "next/router";
import React from "react";
import ReactPlayer from "react-player";

export default function watch() {
  const router = useRouter();
  const { video } = router.query;
  return (
    <div style={{ height: "900px" }}>
      <ReactPlayer url={video} width="60vw" height="30vw" />
    </div>
  );
}
