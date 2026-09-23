import type { FlightOffer } from "@/types/offers";
import { formatPKR, formatTime } from "@/lib/formatters";
import { headers } from "next/headers";

const airlineNames: Record<string, string> = {
  EK: "Emirates",
  FZ: "FlyDubai",
  PK: "Pakistan International Airlines",
  PA: "Airblue",
  G9: "Air Arabia",
  QR: "Qatar Airways",
};

type OffersResponse = {
  offers: FlightOffer[];
  failedAirlines: string[];
};

type FlightResultsProps = {
  simulate: string;
  from: string;
  to: string;
  date?: string;
  pax?: string;
  stops?: string;
  airlines?: string;
  price?: string;
  cabin?: string;
  sort?: string;
};

function ErrorState({ href }: { href: string }) {
  return (
    <section className="rounded-xl border border-red-200 bg-white p-8 text-center sm:p-10">
      <h2 className="text-xl font-semibold text-slate-900">
        We couldn&apos;t load flights
      </h2>

      <p className="mt-2 text-slate-600">
        Flight providers are temporarily unavailable. Please try again.
      </p>

      <a
        href={href}
        className="mt-5 inline-block rounded-lg bg-blue-700 px-5 py-2.5 font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Retry
      </a>
    </section>
  );
}

export default async function FlightResults({
  simulate,
  from,
  to,
  date,
  pax,
  stops,
  airlines,
  price,
  cabin,
  sort,
}: FlightResultsProps) {
  const query = new URLSearchParams({
    from,
    to,
    simulate,
  });

  if (date) query.set("date", date);
  if (pax) query.set("pax", pax);

  if (stops) query.set("stops", stops);
  if (airlines) query.set("airlines", airlines);
  if (price) query.set("price", price);
  if (cabin) query.set("cabin", cabin);
  if (sort) query.set("sort", sort);

  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const offersUrl = `${protocol}://${host}/api/offers?${query.toString()}`;

  let response: Response;

  try {
    response = await fetch(offersUrl, { cache: "no-store" });
  } catch {
    return <ErrorState href={`/air/search?${query.toString()}`} />;
  }

  if (!response.ok) {
    const retryQuery = new URLSearchParams(query);
    retryQuery.set("simulate", "ok");

    return <ErrorState href={`/air/search?${retryQuery.toString()}`} />;
  }

  let data: OffersResponse;

  try {
    data = await response.json();
  } catch {
    return <ErrorState href={`/air/search?${query.toString()}`} />;
  }

  const activeFilters = [
    stops !== undefined ? (stops === "0" ? "Non-stop" : `${stops} stop`) : null,

    airlines
      ? `Airlines: ${airlines
          .split(",")
          .filter(Boolean)
          .map((code) => airlineNames[code] ?? code)
          .join(", ")}`
      : null,

    price ? `Maximum price: ${formatPKR(Number(price))}` : null,

    cabin ? `Cabin: ${cabin}` : null,
  ].filter(Boolean);

  if (data.offers.length === 0) {
    const clearQuery = new URLSearchParams({ from, to });

    if (date) clearQuery.set("date", date);
    if (pax) clearQuery.set("pax", pax);

    return (
      <section className="rounded-xl border border-slate-200 bg-white p-8 text-center sm:p-10">
        <h2 className="text-xl font-semibold text-slate-900">
          No flights found
        </h2>

        <p className="mt-2 text-slate-600">
          No flights match
          {activeFilters.length > 0
            ? `: ${activeFilters.join(", ")}.`
            : " your search."}
        </p>

        <a
          href={`/air/search?${clearQuery.toString()}`}
          className="mt-5 inline-block rounded-lg bg-blue-700 px-5 py-2.5 font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Clear filters
        </a>
      </section>
    );
  }

  return (
    <section aria-labelledby="flight-results-heading">
      {data.failedAirlines.length > 0 && (
        <div
          role="status"
          className="mb-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900"
        >
          <p className="font-semibold">Some airlines couldn&apos;t be loaded</p>

          <p className="mt-1 text-sm">
            We&apos;re showing the flights that are available. Temporarily
            unavailable: {data.failedAirlines.join(", ")}.
          </p>
        </div>
      )}

      <h2
        id="flight-results-heading"
        aria-live="polite"
        aria-atomic="true"
        className="mb-4 text-lg font-semibold text-slate-900"
      >
        {data.offers.length} {data.offers.length === 1 ? "flight" : "flights"}{" "}
        found
      </h2>

      <div role="list" aria-label="Flight search results" className="space-y-4">
        {data.offers.map((offer) => (
          <article
            role="listitem"
            key={offer.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {offer.airline.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {offer.airline.flightNumber}
                </p>
              </div>

              <p className="text-lg font-bold text-blue-700">
                {formatPKR(offer.pricePkr)}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-slate-900 sm:gap-6">
              <div>
                <p className="text-lg font-semibold">
                  {formatTime(offer.departureTime)}
                </p>

                <p className="text-sm text-slate-500">{offer.origin.code}</p>
              </div>

              <span aria-hidden="true">→</span>

              <div>
                <p className="text-lg font-semibold">
                  {formatTime(offer.arrivalTime)}
                </p>

                <p className="text-sm text-slate-500">
                  {offer.destination.code}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm capitalize text-slate-600">
              {offer.stops === 0
                ? "Non-stop"
                : `${offer.stops} stop${offer.stops > 1 ? "s" : ""}`}
              {" · "}
              {Math.floor(offer.durationMinutes / 60)}h{" "}
              {offer.durationMinutes % 60}m{" · "}
              {offer.cabin}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
