"use client"

import { SolvableQuizProvider } from "@/contexts/solvableQuizContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { ReactNode, useState } from "react";
import {Provider as ReduxProvider} from "react-redux"
import {store} from "../redux/store"

const showDevtools =
  process.env.NODE_ENV !== "production" &&
  process.env.NEXT_PUBLIC_SHOW_RQ_DEVTOOLS === "true";

// ⬇️ Devtools sólo en desarrollo y sólo en cliente (no SSR)
const RQDevtools =
  showDevtools
    ? dynamic(
        () =>
          // Esto antes era un import arriba tal que asi cuando era estatico: import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
          import("@tanstack/react-query-devtools").then(
            (m) => m.ReactQueryDevtools
            
          ),
        { ssr: false }
      )
    : (() => null) as unknown as React.ComponentType<{ initialIsOpen?: boolean }>;

export default function Provider({children}: {children: ReactNode}): JSX.Element {
    const [queryClient] = useState(() => new QueryClient({
/*         defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        }, */
      }))

      console.log(RQDevtools)


    return (
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <RQDevtools initialIsOpen={false} />
          <SolvableQuizProvider>{children}</SolvableQuizProvider>
        </QueryClientProvider>
      </ReduxProvider>
    );
}