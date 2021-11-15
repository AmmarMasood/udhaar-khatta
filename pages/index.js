import Layout from "@/components/common/Layout";
import About from "@/components/home/About";
import Landing from "@/components/home/Landing";
import styles from "@/styles/pages/Home.module.scss";
import { Button } from "antd";

export default function HomePage() {
  return (
    <Layout
      childern={
        <div className={styles.container}>
          <Landing />
          <About />
        </div>
      }
    />
  );
}
