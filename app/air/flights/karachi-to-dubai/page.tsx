import Link from "next/link";

export const revalidate = 3600;

export default function KarachiToDubaiPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <Link href="/" className="text-xl font-bold text-blue-700">
            Travel.pk
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900">
          Karachi to Dubai Flights
        </h1>

        <p className="mt-4 max-w-2xl text-slate-600">
          Compare flights from Karachi to Dubai and search available fares in
          PKR across synthetic airline offers.
        </p>

        <Link
          href="/air/search?from=KHI&to=DXB&date=2026-10-12&pax=1&cabin=economy&simulate=ok"
          className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Search live flights
        </Link>
      </div>
    </main>
  );
}
