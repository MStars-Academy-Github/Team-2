import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Login from "../components/Login";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState();
  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user") || "user"));
    }
  }, []);

  return (
    <>
      {user ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
}

export default MyApp;
