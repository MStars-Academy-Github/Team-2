import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Title() {
  const [media, setMedia] = useState();
  console.log(media);
  const router = useRouter();
  const { title } = router.query;
  useEffect(() => {
    axios
      .get(`http://localhost:3001/v1/media/search/by/${title}`)
      .then((res) => {
        setMedia(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [title]);
  return <div>{title}</div>;
}
