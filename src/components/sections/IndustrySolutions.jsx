import { useState } from "react";
import { Container } from "../layout/Layout.jsx";
import Button from "../ui/Button.jsx";
import { industries, scenarios } from "../../data/content.js";
import styles from "./Sections.module.css";
export default function IndustrySolutions() {
  const [index, setIndex] = useState(0);
  const scenario = scenarios[index];
  return (
    <section id="solutions">
      <Container>
        <div className={styles.label}>02 / BUILT AROUND YOU</div>
        <h2>
          Different businesses.
          <br />
          The right flow for each.
        </h2>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Industry scenarios"
        >
          {industries.map((name, i) => (
            <button
              key={name}
              role="tab"
              id={`industry-${i}`}
              aria-controls="industry-panel"
              aria-selected={index === i}
              className={index === i ? styles.active : ""}
              onClick={() => setIndex(i)}
            >
              {name}
            </button>
          ))}
        </div>
        <div
          className={styles.solution}
          id="industry-panel"
          role="tabpanel"
          aria-labelledby={`industry-${index}`}
        >
          <div>
            <span className={styles.label}>{industries[index]}</span>
            <h3>{scenario.title}</h3>
            <p>{scenario.description}</p>
            <Button href="#contact" secondary>
              Let’s discuss your business ↗
            </Button>
          </div>
          <div className={styles.workflow}>
            <span className={styles.label}>
              YOUR WORKFLOW · ILLUSTRATIVE EXAMPLE
            </span>
            {scenario.stages.map((stage, i) => (
              <div key={stage}>
                <span>0{i + 1}</span>
                {stage}
                <span>{i < 3 ? "↓" : "✓"}</span>
              </div>
            ))}
            <p>ϟ {scenario.automation}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
