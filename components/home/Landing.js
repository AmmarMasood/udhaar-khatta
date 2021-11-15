import React from "react";
import styles from "@/styles/components/home/Landing.module.scss";
import { Button } from "antd";
import Link from "next/link";

function Landing() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Udhaar Khata App</h1>
      <Link href="/workspace">
        <Button className={styles.btn} type="primary">
          Continue to my workspace
        </Button>
      </Link>
    </div>
  );
}

export default Landing;
