# Caching Strategy

## Live flight search

The `/air/search` results use `cache: "no-store"`.

Flight prices and availability are volatile. Caching these responses could show users an outdated fare or an offer that is no longer available.

If live fares were cached, users could make decisions using stale booking information.

## Static route content

`/air/flights/karachi-to-dubai` uses:

`export const revalidate = 3600`

This page contains stable informational content rather than live flight availability, so it can be cached and periodically regenerated.

If this content were always uncached, the server would repeatedly regenerate information that rarely changes.

## Principle

Cache stable informational content.

Do not cache volatile booking information such as live fares and availability.
