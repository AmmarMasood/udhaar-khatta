import styles from "@/styles/components/common/Header.module.scss";
import Link from "next/link";
import { Button } from "antd";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Udhaar Khata</a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/login">
              <Button type="primary">Login</Button>
            </Link>
          </li>
          <li>
            <Link href="/join/create-account">
              <Button type="primary">Join Now</Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
