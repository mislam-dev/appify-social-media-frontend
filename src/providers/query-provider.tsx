"use client";

import {
  QueryClient,
  QueryClientProvider,
  type QueryClientConfig,
} from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
};

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient(queryConfig));

  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}
