import Navbar from "./navbar";
import Footer from "./footer";
import InfoPanel from "./InfoPanel";
import { ChildContextProvider, PropsWithChildren } from "react";
import { Router, useRouter } from "next/router";

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
      {router.pathname !== "/myprofile" ? <Footer /> : ""}

      <InfoPanel />
    </div>
  );
}
