"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const airlines = [
  ["EK", "Emirates"],
  ["FZ", "FlyDubai"],
  ["PK", "PIA"],
  ["PA", "Airblue"],
  ["G9", "Air Arabia"],
  ["QR", "Qatar Airways"],
];

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function toggleAirline(code: string) {
    const params = new URLSearchParams(searchParams.toString());

    const selected = params.get("airlines")?.split(",").filter(Boolean) ?? [];

    const updated = selected.includes(code)
      ? selected.filter((item) => item !== code)
      : [...selected, code];

    if (updated.length > 0) {
      params.set("airlines", updated.join(","));
    } else {
      params.delete("airlines");
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("stops");
    params.delete("airlines");
    params.delete("price");
    params.delete("sort");
    params.delete("cabin");

    router.push(`${pathname}?${params.toString()}`);
  }

  const currentStops = searchParams.get("stops") ?? "";
  const currentAirlines =
    searchParams.get("airlines")?.split(",").filter(Boolean) ?? [];
  const currentPrice = searchParams.get("price") ?? "";
  const currentCabin = searchParams.get("cabin") ?? "";
  const currentSort = searchParams.get("sort") ?? "";

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-slate-900">Filters</h2>

        <button
          type="button"
          onClick={clearFilters}
          className="rounded text-sm font-medium text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Clear
        </button>
      </div>

      <fieldset className="mt-5">
        <legend className="font-medium text-slate-900">Stops</legend>

        <div className="mt-3 space-y-3 text-slate-700">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="stops"
              checked={currentStops === ""}
              onChange={() => updateParam("stops", "")}
            />
            Any
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="stops"
              checked={currentStops === "0"}
              onChange={() => updateParam("stops", "0")}
            />
            Non-stop
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="stops"
              checked={currentStops === "1"}
              onChange={() => updateParam("stops", "1")}
            />
            1 stop
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="font-medium text-slate-900">Airlines</legend>

        <div className="mt-3 space-y-3 text-slate-700">
          {airlines.map(([code, name]) => (
            <label
              key={code}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={currentAirlines.includes(code)}
                onChange={() => toggleAirline(code)}
              />
              {name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="cabin" className="block font-medium text-slate-900">
          Cabin
        </label>

        <select
          id="cabin"
          value={currentCabin}
          onChange={(event) => updateParam("cabin", event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900"
        >
          <option value="">Any cabin</option>
          <option value="economy">Economy</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div className="mt-6">
        <label htmlFor="price" className="block font-medium text-slate-900">
          Maximum price
        </label>

        <select
          id="price"
          value={currentPrice}
          onChange={(event) => updateParam("price", event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900"
        >
          <option value="">Any price</option>
          <option value="70000">PKR 70,000</option>
          <option value="100000">PKR 100,000</option>
          <option value="150000">PKR 150,000</option>
          <option value="250000">PKR 250,000</option>
        </select>
      </div>

      <div className="mt-6">
        <label htmlFor="sort" className="block font-medium text-slate-900">
          Sort by
        </label>

        <select
          id="sort"
          value={currentSort}
          onChange={(event) => updateParam("sort", event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900"
        >
          <option value="">Recommended</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="duration">Shortest duration</option>
        </select>
      </div>
    </aside>
  );
}
