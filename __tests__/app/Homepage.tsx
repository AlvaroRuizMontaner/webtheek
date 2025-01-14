import { render, screen } from "@testing-library/react"
import HomePage from "@/app/page"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Home page", () => {

    it("renders home page", () => {
        render(
            <QueryClientProvider client={queryClient}>
              <HomePage />
            </QueryClientProvider>
          );
        expect(screen.getByText("¿Qué ofrece Webtheek?")).toBeInTheDocument()
    });
    
    it("render 'Get started by'", () => {
        render(
            <QueryClientProvider client={queryClient}>
              <HomePage />
            </QueryClientProvider>
          );
        expect(screen.getByText("¿Qué ofrece Webtheek?")).toBeInTheDocument()
    });
})
