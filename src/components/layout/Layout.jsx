import { useState } from "react";
import styles from "./Layout.module.css";
import Button from "../ui/Button.jsx";
export function Container({ children, className = "" }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <Container>
        <div className={styles.bar}>
          <a href="#" className={styles.logo} aria-label="FLOW home">
            <span>↗</span> FLOW<span className={styles.dot}>.</span>
          </a>
          <button
            className={styles.menu}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="navigation"
          >
            {open ? "Close" : "Menu"} ☰
          </button>
          <nav
            id="navigation"
            className={`${styles.nav} ${open ? styles.open : ""}`}
            aria-label="Main navigation"
            onClick={() => setOpen(false)}
          >
            <a href="#system">The system</a>
            <a href="#solutions">Solutions</a>
            <a href="#process">How it works</a>
            <a href="#faq">FAQ</a>
            <Button href="#contact" small>
              Let’s talk ↗
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerRow}>
          <a href="#" className={styles.logo}>
            ↗ FLOW.
          </a>
          <p>Your business. One connected system.</p>
          <a href="#contact">Let’s build your flow ↗</a>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} FLOW. All rights reserved.</span>
          <span>Website + CRM + Automation</span>
        </div>
      </Container>
    </footer>
  );
}
