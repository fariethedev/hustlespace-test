# HustleUP Test

HustleUP Test is a privacy-safe, single-user product prototype with a tiny
read-only mock backend for reviewing the HustleUP marketplace concept. It is
intentionally separate from the operational HustleUP application.

The mock backend serves only fictional catalog data. It has no database,
accounts, contact forms, payments, messaging, uploads, analytics, cookies,
external integrations, or write endpoints.

## Run locally

No package installation is required. From this directory run:

```powershell
node server.js
```

Then open <http://localhost:4173>.

The server exposes only read-only demo endpoints:

- `GET /api/health`
- `GET /api/categories`
- `GET /api/listings`

You can also open `index.html` directly in a browser; the UI falls back to the
same fictional catalog if the mock server is not running.

## Safety boundary

See [`SCOPE.md`](SCOPE.md). This repository must not be expanded into a
multi-user service or connected to real data without a new program eligibility
review.

## License

MIT. See [`LICENSE`](LICENSE).
