import Navbar from "./navbar";
import Footer from "./footer";
import { ChildContextProvider, PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
