import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import styles from "@/styles/components/common/Header.module.scss";
import Link from "next/link";
import { Button, Popover } from "antd";

export default function Header({ loggedIn, username }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Udhaar Khata</a>
        </Link>
      </div>
      <nav>
        <ul>
          {user ? (
            // <Popover placement="bottom" trigger="click" content={() => }>
            <Button onClick={() => logout()}>Log Out</Button>
          ) : (
            // </Popover>
            <>
              {" "}
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
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
