import { useRouter } from "next/router";
import ReactPlayer from "react-player";

type Props = {};
let media = [
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
];

export default function Main({}: Props) {
  const router = useRouter();
  function playHandler(e: any) {
    router.push(`/watch?video=${e}`);
  }
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "30px",
        padding: "30px",
      }}
      className="container"
    >
      <>
        {media.map((video) => {
          return (
            <ReactPlayer
              url={video}
              height="300px"
              width="400px"
              onPlay={() => {
                playHandler(video);
              }}
            />
          );
        })}
      </>
    </div>
  );
}
