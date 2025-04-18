import { render, screen } from "@testing-library/react";
import ProjectsView from "./ProjectsView";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { describe, expect, it } from '@jest/globals';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => "/projects"),
    useRouter: jest.fn(() => ({
        route: '/projects',
        pathname: '/projects',
        query: {},
        asPath: '/projects',
    })),
    useSearchParams: jest.fn(() => ({
        get: jest.fn((key) => (key === "filter" ? "active" : null)),
        entries: jest.fn(() => [["filter", "active"]]),
    })),
}))


/* jest.mock("../../services/ProjectAPI", () => ({
    getProjects: jest.fn(),
})); */

jest.mock("../../hooks/useAuth", () => ({
    useAuth: jest.fn(() => ({
      data: {
        _id: "6686e4e0973beaba4b3f6a29",
        name: "alvaro",
        email: "alvaro.correo@correo.com",
        planType: "silver",
      },
      isError: false,
      authLoading: false,
    })),
  }));
jest.mock("@tanstack/react-query", () => {
    const original = jest.requireActual("@tanstack/react-query");

    return {
        ...original,
        useQuery: jest.fn() // En lugar de darle el retorno, se deja asi para hacer el mock dinamico
    }
});

//defining React Query Wrapper
const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockData = [
    {
        _id: "123", projectName: "projectTestName", clientName: "projectTestClientName", description: "projectTestDescription", manager: "123"
    }
]

describe('ProjectView', () => {
    // beforeEach test BeforeEach function will run and clear the mock and UseQuery
    beforeEach(() => {
      jest.clearAllMocks();
      queryClient.clear();
    });
  
    it('should show loading when isLoading is true', () => {
        (useQuery as jest.Mock).mockReturnValue({ // Mock dinámico
            data: null,
            isLoading: true,
            isError: false,
        });

        render(<ProjectsView />, { wrapper });
        //screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal

        // Verifica que el `role="list"` exista durante el estado de carga
        expect(screen.getByRole("loading-list")).toBeInTheDocument();
    });

    it('should show the data on succesful fetch', () => {
        (useQuery as jest.Mock).mockReturnValue({ // Mock dinámico
            data: mockData,
            isLoading: false,
            isError: false,
        });

        render(<ProjectsView />, { wrapper });
        //screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal

        screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal

        // Verifica que el `role="list"` exista durante el estado de carga
        expect(screen.getByText(/projectTestName/i)).toBeInTheDocument()
    });

    it('should show noseque if data is empty', async () => {
        (useQuery as jest.Mock).mockReturnValue({ // Mock dinámico
            data: [],
            isLoading: false,
            isError: false,
        });

        render(<ProjectsView />, { wrapper });
        //screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal
        
        expect(screen.getByText(/No hay proyectos, aún.../i)).toBeInTheDocument()
    });
  
    it('should handle errors correctly', () => {

        (useQuery as jest.Mock).mockReturnValue({
            data: null,
            isError: true,
            isLoading: false,
        });

        render(<ProjectsView />, { wrapper });

        expect(screen.getByText(/Algo ha fallado.../i)).toBeInTheDocument()

    });
});