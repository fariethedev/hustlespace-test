# HustleUP Test

HustleUP Test is a privacy-safe, single-user product prototype for reviewing
the HustleUP marketplace concept. It is intentionally separate from the
operational HustleUP application.

This prototype uses only fictional, hardcoded listings and local in-memory UI
state. It has no backend, accounts, contact forms, payments, messaging,
uploads, analytics, cookies, or external integrations.

## Run locally

No package installation is required. From this directory run:

```powershell
python -m http.server 4173
```

Then open <http://localhost:4173>.

You can also open `index.html` directly in a browser, although a local server
more closely matches a normal web preview.

## Safety boundary

See [`SCOPE.md`](SCOPE.md). This repository must not be expanded into a
multi-user service or connected to real data without a new program eligibility
review.

## License

MIT. See [`LICENSE`](LICENSE).
