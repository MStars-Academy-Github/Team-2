import Navbar from "./navbar";
import InfoPanel from "./InfoPanel";
import { PropsWithChildren } from "react";
import { useRouter } from "next/router";

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Navbar />
      <main>{children}</main>

      <InfoPanel />
    </div>
  );
}
