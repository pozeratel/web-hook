import { Container } from "../layout/Layout.jsx";
import { steps } from "../../data/content.js";
import styles from "./Sections.module.css";
export default function LaunchSteps() {
  return (
    <section id="process">
      <Container>
        <div className={styles.label}>03 / FROM IDEA TO EVERYDAY</div>
        <div className={styles.heading}>
          <h2>
            A clear path.
            <br />A confident launch.
          </h2>
          <p>
            We handle the connections.
            <br />
            You focus on running your business.
          </p>
        </div>
        <div className={styles.steps}>
          {steps.map(([title, text], i) => (
            <article key={title}>
              <span className={styles.step}>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
