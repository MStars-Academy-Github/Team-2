import { useRouter } from "next/router";

export default function User() {
  const router = useRouter();
  const { user } = router.query;
  console.log(user);

  return <div>[user]</div>;
}
