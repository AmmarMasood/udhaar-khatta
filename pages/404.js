import React from "react";
import Layout from "@/components/common/Layout";
import styles from "@/styles/pages/404.module.scss";
import Link from "next/link";
import { FileUnknownOutlined } from "@ant-design/icons";
import Image from "next/image";

function NotFoundPage() {
  return (
    <Layout
      title="Page not found"
      childern={
        <div className={styles.error}>
          <h1>
            <Image
              src="/images/undraw_page_not_found_re_e9o6.svg"
              width={500}
              height={300}
            />
          </h1>
          <h2>Sorry, there is nothing here</h2>
          <Link href="/">Go Back</Link>
        </div>
      }
    />
  );
}

export default NotFoundPage;
