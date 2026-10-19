# HustleUP Test Roadmap

This roadmap contains approximately **28 hours** of planned development for
the privacy-safe mock of the production HustleUP concept. All work remains
fictional, local, read-only, and free of personal-data processing.

## 1. Prototype foundation — 4 hours

- [ ] Improve the TypeScript domain types and mock API response contracts. (1h)
- [ ] Add a smoke-test script for health, catalog, static assets, and rejected
  write requests. (1.5h)
- [ ] Document local development, build, review scope, and limitations. (1.5h)

## 2. Marketplace concept flows — 5 hours

- [ ] Add richer fictional listing detail previews with categories, availability
  examples, reviews, and seller/shop summaries. (2h)
- [ ] Add a local-only saved-listings and comparison interaction using memory
  state only. (1.5h)
- [ ] Add empty, loading, filtering, and error states for the read-only catalog.
  (1.5h)

## 3. Social and networking simulations — 4 hours

- [ ] Expand fictional feed, story, follow, and creator-discovery previews. (1.5h)
- [ ] Add a canned-message viewer with marketplace and Bond conversation states;
  keep message composition disabled. (1h)
- [ ] Add a fictional Bond matching deck with deterministic local transitions and
  no user profile fields. (1.5h)

## 4. Orders, events, and seller tools — 5 hours

- [ ] Add mock order timelines and buyer-protection status visualisations. (1.5h)
- [ ] Add event-ticket and door-admission previews using sample QR graphics that
  do not identify a person or represent a real ticket. (1.5h)
- [ ] Add a seller dashboard concept with fictional views, saves, inventory, and
  payout-status placeholders. (2h)

## 5. Accessibility and responsive UX — 4 hours

- [ ] Complete keyboard navigation, focus states, dialog semantics, and screen
  reader labels across all simulated flows. (1.5h)
- [ ] Review mobile layouts at narrow, tablet, and desktop widths. (1h)
- [ ] Add reduced-motion styling, contrast checks, and consistent empty states.
  (1.5h)

## 6. Quality and release hygiene — 6 hours

- [ ] Add TypeScript unit tests for filtering, mock responses, and state reset
  behaviour without introducing a database or user identity. (2h)
- [ ] Add a dependency and secret scan to the repository checks. (1h)
- [ ] Add a reproducible static preview build and clean-checkout verification
  guide. (1.5h)
- [ ] Review the mock against the production repository boundary and update
  `SCOPE.md` whenever a simulated feature is added. (1.5h)

## Definition of done

Every roadmap item must preserve the boundary described in `SCOPE.md`: fictional
records only, no accounts, no personal-data fields, no persistence, no external
integrations, and no API write endpoints. The mock must remain clearly labelled
as a concept demonstration of the production repository rather than a live
marketplace.
