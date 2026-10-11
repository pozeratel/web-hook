import { Container } from "../layout/Layout.jsx";
import Button from "../ui/Button.jsx";
import styles from "./Hero.module.css";
export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.eyebrow}>
          <span /> YOUR BUSINESS, CONNECTED
        </div>
        <h1>
          Leads come in.
          <br />
          Sales stay
          <br />
          <span>under control.</span>
        </h1>
        <div className={styles.lower}>
          <div>
            <p>
              Your website, CRM and automation.
              <br />
              One connected system, built around your business.
            </p>
            <div className={styles.actions}>
              <Button href="#contact">
                Build my system <span>↗</span>
              </Button>
              <Button href="#demo" secondary>
                Explore the demo <span>↓</span>
              </Button>
            </div>
          </div>
          <div
            className={styles.diagram}
            aria-label="Website connected to CRM and automation"
          >
            <span>◈ Website</span>
            <i>→</i>
            <span>▦ CRM</span>
            <i>→</i>
            <span>ϟ Automation</span>
            <small>One flow. From first click to closed deal.</small>
          </div>
        </div>
        <div className={styles.foot}>
          <span>Built for the way you work.</span>
          <span>No scattered tools. No missed opportunities.</span>
          <a href="#demo">SCROLL TO EXPLORE ↓</a>
        </div>
      </Container>
    </section>
  );
}
