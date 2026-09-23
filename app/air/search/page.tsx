import { Suspense } from "react";
import FlightResults from "./FlightResults";
import FlightResultsSkeleton from "./FlightsResultSkeleton";
import Filters from "./Filters";
import MobileFilters from "./MobileFilters";
import Link from "next/link";

type SearchPageProps = {
  searchParams: Promise<{
    from?: string;
    to?: string;
    date?: string;
    pax?: string;
    cabin?: string;
    simulate?: string;
    stops?: string;
    airlines?: string;
    price?: string;
    sort?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="rounded text-xl font-bold text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Travel.pk
          </Link>

          <span className="text-sm text-slate-600">Flights in PKR</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {params.from ?? "KHI"} → {params.to ?? "DXB"}
        </h1>

        <p className="mt-1 text-slate-600">
          {params.date ?? "2026-10-12"} · {params.pax ?? "1"} passenger ·{" "}
          {params.cabin ?? "economy"}
        </p>

        <div className="mt-6 md:hidden">
          <MobileFilters />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[240px_minmax(0,1fr)]">
          <div className="hidden md:block">
            <Filters />
          </div>

          <div className="min-w-0">
            <Suspense fallback={<FlightResultsSkeleton />}>
              <FlightResults
                from={params.from ?? "KHI"}
                to={params.to ?? "DXB"}
                date={params.date}
                pax={params.pax}
                simulate={params.simulate ?? "ok"}
                stops={params.stops}
                airlines={params.airlines}
                price={params.price}
                cabin={params.cabin}
                sort={params.sort}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
