import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="font-semibold text-blue-700">Travel.pk</p>

        <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-slate-900">
          Find your next flight from Pakistan.
        </h1>

        <p className="mt-4 max-w-xl text-lg text-slate-600">
          Compare available fares in PKR across Gulf, London, and domestic
          routes.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/air/search?from=KHI&to=DXB&date=2026-10-12&pax=1&cabin=economy&simulate=ok"
            className="rounded-lg bg-blue-700 px-5 py-3 text-center font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Search flights
          </Link>

          <Link
            href="/air/flights/karachi-to-dubai"
            className="rounded-lg border border-slate-300 px-5 py-3 text-center font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Karachi to Dubai guide
          </Link>
        </div>
      </div>
    </main>
  );
}
