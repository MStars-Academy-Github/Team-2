import Navbar from "./Navbar";
import Footbar from "./Footbar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Navbar />
      <main>{children}</main>
      <Footbar />
    </div>
  );
}
