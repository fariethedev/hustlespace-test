# HustleUP Test

HustleUP Test is a privacy-safe, single-user product prototype with a tiny
read-only mock backend for reviewing the HustleUP marketplace concept. It is
intentionally separate from the operational HustleUP application.

The mock backend serves only fictional catalog data. It has no database,
accounts, contact forms, payments, messaging, uploads, analytics, cookies,
external integrations, or write endpoints.

The source is TypeScript (`app.ts` and `server.ts`), compiled with `tsc`, and
the backend runs on Node.js without a web framework or runtime dependency.

## Run locally

Requires Node.js 20+ and npm. From this directory run:

```powershell
npm install
npm run build
npm start
```

Then open <http://localhost:4173>.

The server exposes only read-only demo endpoints:

- `GET /api/health`
- `GET /api/categories`
- `GET /api/listings`

`npm run check` runs the TypeScript type-check without emitting files. The UI
falls back to the same fictional catalog if opened directly without the mock
server.

## Safety boundary

See [`SCOPE.md`](SCOPE.md). This repository must not be expanded into a
multi-user service or connected to real data without a new program eligibility
review.

## License

MIT. See [`LICENSE`](LICENSE).
