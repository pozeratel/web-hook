import express from "express";
import rateLimit from "express-rate-limit";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { validateLead } from "../src/utils/validation.js";
import { saveLead } from "./database.js";
import { deliverToCrm } from "./crm.js";
export function createApp(db) {
  const app = express();
  app.disable("x-powered-by");
  app.use((req, res, next) => {
    res.set("X-Content-Type-Options", "nosniff");
    if (req.path.startsWith("/api/")) res.set("Cache-Control", "no-store");
    next();
  });
  app.use(
    "/api/leads",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 10,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      message: {
        message: "Too many inquiries. Please try again in 15 minutes.",
      },
    }),
  );
  app.use(express.json({ limit: "12kb" }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.post("/api/leads", async (req, res) => {
    if (!req.is("application/json"))
      return res.status(415).json({ message: "Please send JSON data." });
    const { errors, data } = validateLead(req.body);
    if (Object.keys(errors).length)
      return res
        .status(400)
        .json({ message: "Please check your details.", errors });
    const id = randomUUID(),
      createdAt = new Date().toISOString();
    try {
      saveLead(db, data, id, createdAt);
    } catch {
      console.error("Lead persistence failed.");
      return res
        .status(503)
        .json({
          message: "We could not save your inquiry. Please try again shortly.",
        });
    }
    try {
      const result = await deliverToCrm({ ...data, id, createdAt });
      if (result.status === "sent")
        db.prepare("UPDATE leads SET crm_status = ? WHERE id = ?").run(
          "sent",
          id,
        );
    } catch {
      console.error("CRM delivery failed; inquiry remains saved.");
    }
    return res
      .status(201)
      .json({ id, createdAt, message: "Your inquiry has been saved." });
  });
  app.use("/api", (_req, res) =>
    res.status(404).json({ message: "Endpoint not found." }),
  );
  const dist = resolve("dist");
  if (existsSync(dist)) {
    app.use(express.static(dist));
    app.get("/{*path}", (_req, res) =>
      res.sendFile(resolve(dist, "index.html")),
    );
  }
  app.use((error, _req, res, _next) => {
    const status =
      error.type === "entity.too.large"
        ? 413
        : error.type === "entity.parse.failed"
          ? 400
          : 500;
    res
      .status(status)
      .json({
        message:
          status === 413
            ? "Your request is too large."
            : status === 400
              ? "Please send valid JSON."
              : "Something went wrong. Please try again.",
      });
  });
  return app;
}
