"use client"

import { SolvableQuizProvider } from "@/contexts/solvableQuizContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

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

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <SolvableQuizProvider>
              {children}
            </SolvableQuizProvider>
        </QueryClientProvider>
    )
}