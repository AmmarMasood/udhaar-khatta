import styles from "../styles/components/Header.module.scss";
import Link from "next/link"

export default function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                    <a>Udhaar Khatta</a>
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link href="/events">
                          <a>Events</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}