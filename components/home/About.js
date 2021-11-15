import React from "react";
import styles from "@/styles/components/home/About.module.scss";
import Image from "next/image";

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1>About</h1>
        <p>
          {" "}
          Udhaar Khata is a FREE application for personal and commercial use.
          Udhaar app helps you manage credit (Udhaar) with customers and
          supliers. Udhaar Khata is an online ledger (like an online khata or
          journal) to record your outstanding debt, and send auto reminders to
          customers to increase collection and cash flow.
        </p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={"/images/undraw_calculator_re_jy39.svg"}
          width={320}
          height={300}
        />
      </div>
    </div>
  );
}

export default About;
