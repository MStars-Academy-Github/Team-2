import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Login from "../components/Login";
import ParticlesBackground from "../components/Particles";

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
          <ParticlesBackground />
          <Component {...pageProps} />
        </Layout>
      ) : (
        <div className="flex ">
          <div>
            <iframe
              style={{ width: "65vw", height: "100vh" }}
              src="https://my.spline.design/hands3duicopy-cd01dc26cd895fefc94394c2cf7c3612/"
            ></iframe>
          </div>
          {/* <ParticlesBackground /> */}
          <Login />
        </div>
      )}
    </>
  );
}

export default MyApp;
