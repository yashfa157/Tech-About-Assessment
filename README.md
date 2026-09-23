# Travel.pk Flight Results Page

A time-boxed implementation of a flight search results experience for Travel.pk using Next.js App Router, TypeScript, and Tailwind CSS.

The project focuses on server rendering, URL-driven search state, realistic loading/error scenarios, accessibility, responsive behavior, and explicit caching decisions.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local synthetic flight-offer API
- No external flight API required

## 10-Minute Setup

### Requirements

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open:

```text
http://localhost:3000/air/search?from=KHI&to=DXB&simulate=ok
```

### Production build

```bash
npm run build
npm start
```

## Main Routes

### Live Flight Search

```text
/air/search
```

Example:

```text
http://localhost:3000/air/search?from=KHI&to=DXB&simulate=ok
```

The search page is dynamic and uses `cache: "no-store"` for flight offers.

### Cached Informational Route

```text
/air/flights/karachi-to-dubai
```

This route uses:

```ts
export const revalidate = 3600;
```

It demonstrates an informational route that can safely be cached and revalidated.

## Simulation URLs

The local API intentionally supports multiple states so the UI can be tested without an external provider.

### Normal success

```text
http://localhost:3000/air/search?from=KHI&to=DXB&simulate=ok
```

### Slow response / loading state

```text
http://localhost:3000/air/search?from=KHI&to=DXB&simulate=slow
```

### Error

```text
http://localhost:3000/air/search?from=KHI&to=DXB&simulate=error
```

Displays an error state with a Retry action.

### Empty results

```text
http://localhost:3000/air/search?from=KHI&to=DXB&simulate=empty
```

Displays an empty state and allows active filters to be cleared.

### Partial provider failure

```text
http://localhost:3000/air/search?from=KHI&to=DXB&simulate=partial
```

Displays available results together with a warning about failed airline/provider results.

## URL as Search State

Search and filter state is stored in URL query parameters rather than hidden client state.

Supported parameters include:

- `from`
- `to`
- `date`
- `pax`
- `cabin`
- `stops`
- `airlines`
- `price`
- `sort`
- `simulate`

This makes searches:

- refresh-safe
- shareable
- bookmarkable
- compatible with browser Back/Forward navigation

## Architecture

The implementation keeps client-side JavaScript limited to interactive functionality.

### Server-side

- `app/air/search/page.tsx`
- `FlightResults.tsx`
- `/api/offers`
- flight fetching and rendering

### Client-side

- `Filters.tsx`
- `MobileFilters.tsx`

Client components are used only where browser interaction is required, such as updating filters and controlling the mobile filter dialog.

`Suspense` is used around the flight results with a dedicated skeleton fallback.

## Synthetic Offers API

The route:

```text
/api/offers
```

uses local synthetic flight data and supports:

- origin/destination filtering
- stops
- airlines
- maximum price
- cabin
- sorting
- artificial latency
- success, slow, error, empty, and partial scenarios

This keeps the assessment deterministic and avoids depending on an external flight API.

## Accessibility

Accessibility considerations include:

- semantic/named results list
- keyboard-operable native form controls
- visible `:focus-visible` states
- polite live region for result-count changes
- accessible mobile filter dialog
- `aria-modal`
- Escape-to-close behavior
- focus trapping in the mobile dialog
- focus restoration after closing
- responsive behavior at 200% browser zoom

A keyboard-only pass and responsive/mobile check were performed during final verification.

## Caching Strategy

Live flight fares use:

```ts
cache: "no-store";
```

because availability and prices can change frequently and stale fares would be misleading.

The informational Karachi → Dubai route uses:

```ts
export const revalidate = 3600;
```

because informational route content can tolerate controlled staleness.

See [`CACHING.MD`](./CACHING.MD) for the full caching rationale.

## Public-Site Audit

The public Travel.pk flight search experience was reviewed separately using Chrome Lighthouse Mobile.

Observed Lighthouse scores during the audit:

- Performance: 48
- Accessibility: 85
- LCP: 7.2s

The audit identified areas including render-blocking resources, JavaScript/main-thread cost, unused JS/CSS, ARIA issues, missing accessible button names, and color contrast.

The public website was **not modified**.

See [`AUDIT.MD`](./AUDIT.MD) for the findings.

## Testing and Verification

Final manual verification includes:

- normal results
- slow/loading state
- error and Retry
- empty state
- partial-results warning
- URL refresh
- browser Back/Forward navigation
- keyboard navigation
- mobile filter dialog
- 200% browser zoom
- production build

Final commands:

```bash
npm run lint
npm run build
```

## Trade-offs / Gaps

This was a time-boxed assessment, so the implementation intentionally prioritizes the required user journey and architecture.

Current limitations include:

- synthetic local flight data instead of a real provider
- no automated end-to-end browser test suite
- limited route/search combinations
- simplified airline/airport metadata
- no authentication or booking flow
- visual design focuses on the assessment flow rather than full Travel.pk parity

## Next Steps

With more time, I would:

1. Add Playwright end-to-end tests for search, filters, and simulation states.
2. Add unit/integration tests for offer filtering and sorting.
3. Integrate a real flight provider behind a server-side adapter.
4. Expand airport, airline, and route metadata.
5. Add deeper automated accessibility checks.
6. Add production monitoring and error reporting.

## Additional Documentation

- [`CACHING.MD`](./CACHING.MD) — caching strategy and trade-offs
- [`AUDIT.MD`](./AUDIT.MD) — public Travel.pk Lighthouse/accessibility audit
