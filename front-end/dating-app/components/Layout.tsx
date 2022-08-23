import Navbar from "./navbar";
import Footer from "./footer";
import InfoPanel from "./InfoPanel";
import { ChildContextProvider, PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
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
      <Footer />
      <InfoPanel />
    </div>
  );
}
