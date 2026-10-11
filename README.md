# FLOW — website + CRM + automation

Local React + Vite application with an Express API and persistent SQLite storage. All interface content is English. The reference URL could not be accessed; the implementation follows the supplied dark/lime visual brief. No screenshots were attached.

## Requirements and launch

Node.js 24 or newer (uses built-in `node:sqlite`). From the project directory:

```sh
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell use `npm.cmd` if script execution is disabled, and `Copy-Item .env.example .env` to copy the environment file. Open http://127.0.0.1:5173. The API listens at http://127.0.0.1:3001; Vite proxies `/api` to it. If you change the backend port, update the proxy in `vite.config.js` too.

Separate terminals: `npm run dev:server` and `npm run dev:client`.

Production: `npm run build`, then `npm start`. Express serves both `dist/` and the API at http://127.0.0.1:3001. The server binds to loopback by default; configure the bind address and trusted reverse proxy deliberately when hosting externally.

## Structure

- `src/components/layout/`: header, footer and container.
- `src/components/ui/`: shared button and labeled form field.
- `src/components/sections/`: hero, benefits, industry scenarios, launch steps and FAQ.
- `src/components/CrmDemo/`: isolated, in-memory demo pipeline, columns and cards.
- `src/components/ContactForm/`: submission states and international phone input.
- `src/data/`, `services/`, `utils/`, `styles/`: content, API client, shared validation and design tokens.
- `server/`: Express application, parameterized SQLite persistence and future CRM adapter.

## Configuration and privacy

`PORT` defaults to `3001`. `DATABASE_PATH` defaults to `./data/flow.sqlite`, relative to the project directory. `.env`, database files and build output are ignored by Git. Never put CRM secrets in `VITE_*` variables: those are public browser configuration.

`POST /api/leads` accepts `fullName`, E.164 `phone`, optional `email`, `industry` and `comments`. Both client and server validate length, phone metadata, email format and industry. The API limits JSON bodies to 12 KB and requests to 10 per IP per 15 minutes. It returns 201 only after SQLite confirms insertion. No public lead-list endpoint exists. The public demo is synthetic and never queries saved inquiries. Phone country selection uses the library's native accessible country selector, including country names and calling codes; browser keyboard type-ahead is supported.

## CRM integration

No provider is configured. Saved inquiries explicitly retain `crm_status = not_configured`. Implement the selected provider in `server/crm.js`, add server-only credentials, map fields, and mark delivery sent only after provider confirmation. Before production integration add a durable outbox and retry worker, idempotency by lead ID, monitoring and provider-specific integration tests. CRM failure must not discard a saved inquiry.

## Checks

```sh
npm test
npm run build
node tests/browser.mjs
```

The browser check requires the dev servers and installed Microsoft Edge. It exercises synthetic CRM additions/movement, scenario switching, empty/invalid form fields, international phone submission, network failure with retained data, success, mobile navigation and page overflow at 375/768/1440px. Screenshots go to ignored `test-results/`. API tests use temporary databases and verify server restart persistence, field validation, body size limits, rate limits, malformed JSON and absence of a public listing route. Browser success creates one synthetic inquiry in the local database.

## Hosting SQLite

SQLite needs a durable writable disk, backups and a single deployment location. Ephemeral/serverless disks will lose data and multiple independent replicas do not share this database. WAL helps local concurrency but writes remain serialized; use a managed database for higher write volume or horizontally scaled deployments. For an internet deployment add HTTPS, operational backups, retention/deletion policies, appropriate proxy trust and a shared rate-limit store when running multiple instances.
