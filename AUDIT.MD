# Travel.pk Flight Search Audit

## Page Audited

Travel.pk flight search results page for Karachi (KHI) → Dubai (DXB).

## Method

Chrome Lighthouse was run using the mobile configuration with Performance and Accessibility enabled.

This was a report-only audit. No changes were made to the public Travel.pk website.

## Lighthouse Scores

- Performance: 48
- Accessibility: 85

## Findings

### 1. Slow Largest Contentful Paint

**Evidence:** Lighthouse reported an LCP of 7.2 seconds.

**Who it hurts:** Users on slower mobile devices or networks may wait too long before important flight-search content becomes visible.

**Severity:** High

**One-line fix:** Reduce critical rendering work and prioritize above-the-fold content and resources.

### 2. Render-blocking resources

**Evidence:** Lighthouse identified render-blocking requests with an estimated saving of approximately 1,110 ms.

**Who it hurts:** Users on slower connections experience a longer delay before useful page content appears.

**Severity:** Medium

**One-line fix:** Defer non-critical resources and prioritize only the CSS and assets required for initial rendering.

### 3. Heavy main-thread work

**Evidence:** Lighthouse reported approximately 10.2 seconds of main-thread work, including about 6.8 seconds of JavaScript execution.

**Who it hurts:** Users on lower-powered mobile devices may experience delayed interactions, scrolling, and input responsiveness.

**Severity:** High

**One-line fix:** Reduce client-side JavaScript and defer non-essential work until after the initial page becomes interactive.

### 4. Unused JavaScript and CSS

**Evidence:** Lighthouse reported approximately 72 KiB of potentially unused JavaScript and 31 KiB of unused CSS.

**Who it hurts:** Mobile users and users on limited or slow connections download and process resources they do not immediately need.

**Severity:** Medium

**One-line fix:** Remove unused code and styles and load route-specific resources only where required.

### 5. ARIA accessibility issues

**Evidence:** Lighthouse reported ARIA roles missing required child roles and elements using prohibited ARIA attributes.

**Who it hurts:** Screen-reader and other assistive-technology users may receive incorrect or confusing information about controls and page structure.

**Severity:** High

**One-line fix:** Correct invalid ARIA relationships and prefer native semantic HTML wherever possible.

### 6. Accessible names and color contrast

**Evidence:** Lighthouse identified a button without an accessible name and multiple elements with insufficient foreground/background color contrast.

**Who it hurts:** Screen-reader users may not understand the purpose of unnamed controls, while users with low vision may struggle to read low-contrast content.

**Severity:** High

**One-line fix:** Give every interactive control an accessible name and adjust foreground/background combinations to meet WCAG contrast requirements.

## How This Influenced My Implementation

The audit influenced the assessment implementation by prioritizing:

- Semantic HTML and accessible labels for interactive controls.
- Visible keyboard focus states.
- Sufficient text/background contrast.
- Minimal unnecessary client-side JavaScript.
- Loading skeletons for asynchronous flight results.
- Explicit empty, partial-success, and error states.
- Responsive desktop and mobile filters.
- Keyboard-operable interactions and mobile-dialog focus management.

## Limitations

Lighthouse automated testing does not detect every accessibility or usability issue. I therefore also manually checked keyboard navigation, visible focus, mobile dialog behavior, and the page at 200% browser zoom.

This audit is based on the Lighthouse results observed during testing and is intended as a concise assessment of the public page rather than a complete accessibility conformance review.
