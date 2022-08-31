import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Login from "../components/login";
import Register from "../components/register";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Login /> <br />
      <Register />
    </div>
  );
};

export default Home;
