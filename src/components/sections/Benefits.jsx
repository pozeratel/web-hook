import { Container } from "../layout/Layout.jsx";
import { benefits } from "../../data/content.js";
import styles from "./Sections.module.css";
export default function Benefits() {
  return (
    <section id="system">
      <Container>
        <div className={styles.label}>01 / THE SYSTEM</div>
        <div className={styles.heading}>
          <h2>
            Everything connected.
            <br />
            Nothing falls through.
          </h2>
          <p>
            Give your team a clear view of every lead,
            <br />
            every conversation and every next step.
          </p>
        </div>
        <div className={styles.grid}>
          {benefits.map(([n, title, text]) => (
            <article className={styles.card} key={n}>
              <span className={styles.number}>{n} ↗</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
