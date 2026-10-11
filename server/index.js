import { openDatabase } from "./database.js";
import { createApp } from "./app.js";
const db = openDatabase();
const port = Number(process.env.PORT) || 3001;
const server = createApp(db).listen(port, "127.0.0.1", () =>
  console.log(`FLOW server: http://127.0.0.1:${port}`),
);
function shutdown() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
