"use client";

import { useEffect, useRef, useState } from "react";
import Filters from "./Filters";

export default function MobileFilters() {
  const [open, setOpen] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;

    if (!dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, input, select, a[href], [tabindex]:not([tabindex="-1"])',
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open && wasOpenRef.current) {
      triggerRef.current?.focus();
    }

    wasOpenRef.current = open;
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Filters
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filter-title"
            className="mx-auto max-h-[90vh] max-w-md overflow-y-auto rounded-xl bg-white p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2
                id="mobile-filter-title"
                className="text-lg font-semibold text-slate-900"
              >
                Filter flights
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                ✕
              </button>
            </div>

            <Filters />

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Show results
            </button>
          </div>
        </div>
      )}
    </>
  );
}
