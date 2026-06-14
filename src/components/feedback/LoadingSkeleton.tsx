import { cn } from "@/lib/utils/cn";

interface LoadingSkeletonProps {

  count?: number;
  className?: string;
}

export function LoadingSkeleton({ count = 3, className }: LoadingSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-[6px] bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 rounded bg-gray-200" />
              <div className="h-2 w-1/4 rounded bg-gray-100" />
            </div>
          </div>
          <div className="h-40 w-full rounded bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
