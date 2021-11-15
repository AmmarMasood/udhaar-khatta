import React from 'react';
import Link from 'next/link';
import styles from "@/styles/components/Footer.module.css";


function Footer() {
    return (
        <footer className={styles.footer}>
            <p>Copyright &copy; Udhaar Khatta 2021</p>
            <Link href="/about">
                <a>
                    About This Project
                </a>
            </Link>
        </footer>
    )
}

export default Footer
