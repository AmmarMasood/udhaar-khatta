import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import styles from "@/styles/components/Layout.module.scss";
import { useRouter } from "next/router";

function Layout({ title, keywords, description, childern }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />

      <div className={styles.container}>{childern}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Udhaar Khatta | Pakistan's No 1 Udhaar App",
  keywords: "udhaar debt money pakistan khatta",
  description: "Udhaar Khatta is your digital Khatabook, Cashbook, SalaryBook, Invoice Maker, and Inventory (Stock) manager. Udhaar Khatta is the only app you need to run and grow your business.",
};
export default Layout;