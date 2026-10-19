# HustleUP Test

HustleUP Test is a privacy-safe, single-user product prototype with a tiny
read-only mock backend for reviewing the HustleUP marketplace concept. It is
intentionally separate from the operational HustleUP application.

> **Relationship to production:** This repository is a transparent mock of the
> production HustleUP project. It demonstrates selected production concepts
> with fictional data only; it is not the production repository, does not copy
> production data or credentials, and is not an operational marketplace.

The mock backend serves only fictional catalog data. It has no database,
accounts, contact forms, payments, messaging, uploads, analytics, cookies,
external integrations, or write endpoints.

The source is TypeScript (`app.ts` and `server.ts`), compiled with `tsc`, and
the backend runs on Node.js without a web framework or runtime dependency.

The UI also includes simulated, read-only previews for shops, social feed and
stories, direct messages, orders and protection, events and tickets, seller
tools, Hustle Bond, and premium plans. These are fictional product concepts,
not operational features.

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

See [`ROADMAP.md`](ROADMAP.md) for approximately 28 hours of planned work.

## License

MIT. See [`LICENSE`](LICENSE).
