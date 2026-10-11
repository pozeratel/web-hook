import { useState } from "react";
import { Container } from "../layout/Layout.jsx";
import Button from "../ui/Button.jsx";
import styles from "./CrmDemo.module.css";
const stages = ["New leads", "In progress", "Proposal sent", "Won"];
const initial = [
  {
    id: 1,
    name: "Brand identity project",
    company: "Studio North",
    value: 2400,
    stage: 0,
  },
  {
    id: 2,
    name: "Website & CRM setup",
    company: "Greenline Services",
    value: 4200,
    stage: 0,
  },
  {
    id: 3,
    name: "Monthly service plan",
    company: "Oak & Co.",
    value: 1800,
    stage: 1,
  },
  {
    id: 4,
    name: "E-commerce integration",
    company: "Forma Store",
    value: 3600,
    stage: 2,
  },
  {
    id: 5,
    name: "Business automation",
    company: "Bright Works",
    value: 2800,
    stage: 3,
  },
];
const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
function LeadCard({ lead, onMove }) {
  return (
    <article className={styles.card}>
      <span className={styles.tag}>Website inquiry</span>
      <h4>{lead.name}</h4>
      <p>{lead.company}</p>
      <div>
        <strong>{money(lead.value)}</strong>
        <span className={styles.avatar}>{lead.company[0]}</span>
      </div>
      {lead.stage < 3 && (
        <button
          onClick={() => onMove(lead.id)}
          aria-label={`Move ${lead.name} to ${stages[lead.stage + 1]}`}
        >
          Move to {stages[lead.stage + 1]} →
        </button>
      )}
    </article>
  );
}
function Column({ stage, index, leads, onMove }) {
  return (
    <div className={styles.column}>
      <div className={styles.columnHead}>
        <span className={`${styles.status} ${index === 3 ? styles.won : ""}`} />
        <strong>{stage}</strong>
        <span>{leads.length}</span>
      </div>
      <p className={styles.total}>
        {money(leads.reduce((sum, l) => sum + l.value, 0))}
      </p>
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} onMove={onMove} />
      ))}
    </div>
  );
}
export default function CrmDemo() {
  const [leads, setLeads] = useState(initial);
  const [announcement, setAnnouncement] = useState("");
  function add() {
    setLeads((old) => [
      ...old,
      {
        id: Date.now(),
        name: `Demo opportunity ${old.length + 1}`,
        company: "Sample company",
        value: 1500,
        stage: 0,
      },
    ]);
    setAnnouncement("A demo lead was added to New leads.");
  }
  function move(id) {
    setLeads((old) =>
      old.map((l) => (l.id === id ? { ...l, stage: l.stage + 1 } : l)),
    );
    setAnnouncement("Demo lead moved to the next stage.");
  }
  return (
    <section id="demo" className={styles.section}>
      <Container>
        <div className={styles.intro}>
          <div>
            <span className={styles.label}>SEE THE FLOW IN ACTION</span>
            <h2>From inquiry to opportunity.</h2>
          </div>
          <p>A small preview of a more organized day.</p>
        </div>
        <div className={styles.board}>
          <div className={styles.toolbar}>
            <div>
              <strong>
                <span className={styles.mark}>↗</span> FLOW{" "}
                <span className={styles.separator}>/</span> Sales pipeline
              </strong>
              <span className={styles.demoBadge}>DEMO DATA ONLY</span>
            </div>
            <Button small onClick={add}>
              + Add a demo lead
            </Button>
          </div>
          <div className={styles.stats}>
            <div>
              <span>Total opportunities</span>
              <strong>{leads.length}</strong>
            </div>
            <div>
              <span>Pipeline value</span>
              <strong>{money(leads.reduce((s, l) => s + l.value, 0))}</strong>
            </div>
            <div>
              <span>Won deals</span>
              <strong className={styles.lime}>
                {leads.filter((l) => l.stage === 3).length}
              </strong>
            </div>
            <div>
              <span>System status</span>
              <strong className={styles.live}>● Demo mode</strong>
            </div>
          </div>
          <div className={styles.columns}>
            {stages.map((stage, i) => (
              <Column
                key={stage}
                stage={stage}
                index={i}
                leads={leads.filter((l) => l.stage === i)}
                onMove={move}
              />
            ))}
          </div>
          <div className={styles.boardFoot}>
            <span>
              ϟ Example automation: new inquiry → assign owner → create
              follow-up
            </span>
            <button
              onClick={() => {
                setLeads(initial);
                setAnnouncement("Demo reset.");
              }}
            >
              Reset demo ↺
            </button>
          </div>
        </div>
        <p className={styles.note} role="status">
          {announcement ||
            "Interactive sample data. Real contact inquiries are never shown here."}
        </p>
      </Container>
    </section>
  );
}
