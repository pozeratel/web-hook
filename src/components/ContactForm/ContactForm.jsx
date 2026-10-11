import { useRef, useState } from "react";
import { Container } from "../layout/Layout.jsx";
import Field from "../ui/Field.jsx";
import Button from "../ui/Button.jsx";
import PhoneField from "./PhoneField.jsx";
import { industries } from "../../data/content.js";
import { validateLead } from "../../utils/validation.js";
import { submitLead } from "../../services/leads.js";
import styles from "./ContactForm.module.css";
const empty = {
  fullName: "",
  phone: "",
  email: "",
  industry: "",
  comments: "",
};
export default function ContactForm() {
  const [data, setData] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const lock = useRef(false);
  const form = useRef(null);
  function change(e) {
    setData((old) => ({ ...old, [e.target.name]: e.target.value }));
  }
  async function submit(e) {
    e.preventDefault();
    if (lock.current) return;
    const result = validateLead(data);
    setErrors(result.errors);
    setMessage("");
    if (Object.keys(result.errors).length) {
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      requestAnimationFrame(() =>
        form.current.querySelector('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    lock.current = true;
    setStatus("sending");
    try {
      await submitLead(result.data);
      setStatus("success");
      setMessage(
        "Your inquiry has been saved. We’ll be in touch to discuss your business.",
      );
      setData(empty);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
      setErrors(error.fields || {});
    } finally {
      lock.current = false;
    }
  }
  return (
    <section id="contact" className={styles.section}>
      <Container>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <span className={styles.label}>LET’S CONNECT THE DOTS</span>
            <h2>
              Ready for a<br />
              better <span>flow?</span>
            </h2>
            <p>
              Tell us a little about your business.
              <br />
              We’ll help you find a clearer way forward.
            </p>
            <div className={styles.promise}>
              <span>↗</span>
              <div>
                <strong>A conversation, without the pressure.</strong>
                <p>
                  We’ll discuss your goals, current tools and what your business
                  needs next.
                </p>
              </div>
            </div>
          </div>
          <form ref={form} noValidate onSubmit={submit} className={styles.form}>
            <div className={styles.formHead}>
              <h3>Let’s build your system</h3>
              <p>
                Start with a few details. <span>* Required</span>
              </p>
            </div>
            <Field
              id="fullName"
              name="fullName"
              label="Full name *"
              autoComplete="name"
              maxLength={120}
              required
              value={data.fullName}
              onChange={change}
              error={errors.fullName}
              placeholder="Your full name"
            />
            <PhoneField
              value={data.phone}
              onChange={(phone) =>
                setData((old) => ({ ...old, phone: phone || "" }))
              }
              error={errors.phone}
            />
            <div className={styles.row}>
              <Field
                id="email"
                name="email"
                type="email"
                label="Email address (optional)"
                autoComplete="email"
                maxLength={254}
                value={data.email}
                onChange={change}
                error={errors.email}
                placeholder="you@company.com"
              />
              <Field
                as="select"
                id="industry"
                name="industry"
                label="Industry (optional)"
                value={data.industry}
                onChange={change}
                error={errors.industry}
              >
                <option value="">Select your industry</option>
                {industries.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </Field>
            </div>
            <Field
              as="textarea"
              id="comments"
              name="comments"
              label="Comments (optional)"
              maxLength={2000}
              value={data.comments}
              onChange={change}
              error={errors.comments}
              placeholder="What would you like to improve in your business?"
            />
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending"
                ? "Saving your inquiry…"
                : "Let’s talk about your business ↗"}
            </Button>
            <p className={styles.privacy}>
              Your details are used to respond to your inquiry and are stored
              privately. They never appear in the demo.
            </p>
            {message && (
              <div
                role={status === "error" ? "alert" : "status"}
                className={status === "success" ? styles.success : styles.error}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
