import Navbar from "./Navbar";
import Footbar from "./Footbar";
import { PropsWithChildren } from "react";
import SideNavigationBar from "./SideNavigationBar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        maxWidth: "100vw",
      }}
    >
      <Navbar />
      <div
        style={{
          display: "flex",
          marginTop: "60px",
          width: "100vw",
          justifyContent: "space-between",
        }}
      >
        <SideNavigationBar />
        <main style={{ width: "100%" }}>{children}</main>
      </div>

      <Footbar />
    </div>
  );
}
