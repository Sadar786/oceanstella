Purpose
-------
This file gives concise, repo-specific guidance for AI coding agents working on Ocean Stella.

High-level architecture
-----------------------
- Frontend (`/`): Vite + React app in the repository root (`package.json` at repo root). Dev entry: `npm run dev` (Vite). Built output goes to `dist` and is deployed with `npm run deploy` (uses `gh-pages`).
- Admin UI: under `src/admin/` (React pages and `DashSidebar.jsx`, dashboard sections). Frontend components live in `src/components/` and feature-grouped subfolders (e.g., `blogComponents/`, `caseStudy/`, `productComps/`).
- State: Redux is used (`src/redux/store.jsx`) with `redux-persist` (note exported names: `store, persistore`).
- Auth: Client uses Firebase SDK (`src/firebase.js`) for app init; there is also server-side auth with JWT (`OSbackend/` sets `os_at` cookie). Check `OSbackend/routes/auth.js` for API contract.
- Backend (`OSbackend/`): Express + MongoDB API (CommonJS). Key files:
  - `OSbackend/server.js` — main Express setup and API route mounting (`/api/v1/*`).
  - `OSbackend/config/db.js` — expects `MONGODB_URI` env var.
  - `OSbackend/config/cloudinary.js` — expects `CLOUDINARY_*` env vars.
  - `OSbackend/routes/` and `OSbackend/modules/` — route handlers and model-like modules.

Developer workflows (quick commands)
----------------------------------
- Install dependencies (frontend):
  - `npm install` (run in repo root)
- Start frontend dev server (PowerShell):
  - `npm run dev`
- Install & run backend (PowerShell):
  - `cd OSbackend; npm install; npm run dev` (uses `nodemon`)
- Run production backend:
  - `cd OSbackend; npm start`
- Seed or check DB (backend):
  - `cd OSbackend; npm run seed`  # uses `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD` env optionally
  - `cd OSbackend; npm run check`
- Deploy frontend to GitHub Pages (root):
  - `npm run deploy` (builds with `vite build` then `gh-pages -d dist`)

Environment variables (discoverable in code)
-------------------------------------------
- Frontend (Vite): prefixed `VITE_` — set in `.env` or `.env.local`:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_APP_ID`
  - Note: `src/firebaseConfig.js` contains a hard-coded config; `src/firebase.js` uses env vars — prefer the env-based approach for dev/staging.
- Backend (OSbackend): set in `OSbackend/.env` or environment:
  - `MONGODB_URI` (required by `OSbackend/config/db.js`)
  - `JWT_ACCESS_SECRET` (used for `os_at` cookie JWTs in `server.js`)
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  - `CORS_ORIGIN` (comma-separated list, used by `server.js`)
  - `PORT` (optional, default 8080)
  - `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` (optional for `npm run seed`)

Project-specific patterns & gotchas
----------------------------------
- ESM vs CommonJS: Frontend uses ESM (Vite + `type: module`); backend is CommonJS — do not mix module styles across server files.
- API prefix & cookie: Backend API uses `/api/v1/` prefix and sets/reads JWT cookie named `os_at`. Frontend auth flows expect this cookie-based access token pattern.
- Uploads: Backend serves uploaded files from `/uploads` (static) and integrates Cloudinary in `OSbackend/config/cloudinary.js`.
- DB helpers: `OSbackend/scripts/seed.js` uses upserts (idempotent seed). Use `npm run seed` to populate demo data.
- State export name caution: `src/redux/store.jsx` exports `persistore` (not `persistor`) — be careful when changing this export or its imports.

Where to look for authoritative examples
---------------------------------------
- Start/dev scripts: `package.json` (root) and `OSbackend/package.json` (backend).  
- API wiring and middleware: `OSbackend/server.js` (CORS policy, health endpoints `/api/v1/health`, cookie parsing, route mounts).  
- DB & cloud integration: `OSbackend/config/db.js`, `OSbackend/config/cloudinary.js`.  
- Frontend firebase usage: `src/firebase.js`, `src/firebaseConfig.js`.  
- Redux + persistence: `src/redux/store.jsx` and `src/main.jsx` (uses `PersistGate`).

What AI agents should do first
-----------------------------
1. Read `OSbackend/server.js` to understand middleware and API prefixes.  
2. Open `src/main.jsx` and `src/redux/store.jsx` to understand app boot, auth wrapper (`AuthInit`) and persisted store naming.  
3. Check `OSbackend/routes/auth.js` and `src/components/RequireAuth.jsx` to map client <-> server auth flow.
4. Verify env variables are documented/available before running seed or integration tasks.

If anything above is unclear or you want more details (examples of auth endpoints, a list of environment variables to put in a `.env.example`, or a short checklist for local setup), tell me which section to expand or clarify.
