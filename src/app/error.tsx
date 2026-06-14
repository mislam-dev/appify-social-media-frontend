"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f0f2f5] p-6 text-center">
      <h1 className="text-2xl font-semibold text-[#2d3748]">
        Something went wrong
      </h1>
      <p className="max-w-md text-sm text-[#666]">
        An unexpected error occurred while rendering this page. You can try
        again, and if the problem persists please reload.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-[#1890ff] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
