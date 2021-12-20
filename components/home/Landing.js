import React, { useContext } from "react";
import styles from "@/styles/components/home/Landing.module.scss";
import { Button } from "antd";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

function Landing() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <h1>Welcome to Udhaar Khata App</h1>
      {user && (
        <Link href="/workspace/my-khata">
          <Button className={styles.btn} type="primary">
            Continue to my workspace
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Landing;
