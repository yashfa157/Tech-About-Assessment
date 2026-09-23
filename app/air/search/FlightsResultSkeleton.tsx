export default function FlightResultsSkeleton() {
  return (
    <div aria-label="Loading flights" role="status" className="space-y-4">
      <span className="sr-only">Loading flight results</span>

      <div className="h-7 w-36 animate-pulse rounded bg-slate-200" />

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-40 animate-pulse rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="h-5 w-32 rounded bg-slate-200" />

          <div className="mt-3 h-4 w-20 rounded bg-slate-200" />

          <div className="mt-7 h-5 w-52 max-w-full rounded bg-slate-200" />

          <div className="mt-4 h-4 w-40 max-w-full rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
