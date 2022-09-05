import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import TopNavigationBar from "./TopNavigationBar";

type Props = {};
let media = [
  "https://www.youtube.com/watch?v=5GJWxDKyk3A&ab_channel=BillieEilishVEVO",
  "https://www.youtube.com/watch?v=5GJWxDKyk3A&ab_channel=BillieEilishVEVO",
  "https://www.youtube.com/watch?v=5GJWxDKyk3A&ab_channel=BillieEilishVEVO",
  "https://www.youtube.com/watch?v=5GJWxDKyk3A&ab_channel=BillieEilishVEVO",
  "https://www.youtube.com/watch?v=5GJWxDKyk3A&ab_channel=BillieEilishVEVO",
  "https://www.youtube.com/watch?v=5GJWxDKyk3A&ab_channel=BillieEilishVEVO",
  "https://www.youtube.com/watch?v=5GJWxDKyk3A&ab_channel=BillieEilishVEVO",
  "https://www.youtube.com/watch?v=5GJWxDKyk3A&ab_channel=BillieEilishVEVO",
  "https://www.youtube.com/watch?v=2fDzCWNS3ig&ab_channel=TheWeekndVEVO",
  "https://www.youtube.com/watch?v=2fDzCWNS3ig&ab_channel=TheWeekndVEVO",
  "https://www.youtube.com/watch?v=2fDzCWNS3ig&ab_channel=TheWeekndVEVO",
  "https://www.youtube.com/watch?v=2fDzCWNS3ig&ab_channel=TheWeekndVEVO",
  "https://www.youtube.com/watch?v=2fDzCWNS3ig&ab_channel=TheWeekndVEVO",
  "https://www.youtube.com/watch?v=2fDzCWNS3ig&ab_channel=TheWeekndVEVO",
  "https://www.youtube.com/watch?v=2fDzCWNS3ig&ab_channel=TheWeekndVEVO",
  "https://www.youtube.com/watch?v=2fDzCWNS3ig&ab_channel=TheWeekndVEVO",
];

export default function Main({}: Props) {
  const router = useRouter();
  return (
    <div
      style={
        {
          // backgroundColor: "#343a40",
          // height: "100vh",
        }
      }
    >
      <TopNavigationBar />
      <div className="grid grid-cols-4 gap-5">
        {media.map((video, i) => {
          return (
            <div>
              <ReactPlayer
                key={i}
                url={video}
                width="100%"
                height="100%"
                onPlay={() => {
                  router.push(`/watch?video=${video}`);
                }}
              />
              <p>Billie Eilish</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
