import { Container } from "../layout/Layout.jsx";
import { faqs } from "../../data/content.js";
import styles from "./Sections.module.css";
export default function FAQ() {
  return (
    <section id="faq">
      <Container>
        <div className={styles.faq}>
          <div>
            <div className={styles.label}>04 / GOOD QUESTIONS</div>
            <h2>
              A little clarity
              <br />
              before we talk.
            </h2>
          </div>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
