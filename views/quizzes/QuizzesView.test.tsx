import { render, screen } from "@testing-library/react";
import QuizzesView from "./QuizzesView";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => "/quizzes"),
    useRouter: jest.fn(() => ({
        route: '/quizzes',
        pathname: '/quizzes',
        query: {},
        asPath: '/quizzes',
    })),
    useSearchParams: jest.fn(() => ({
        get: jest.fn((key) => (key === "filter" ? "active" : null)),
        entries: jest.fn(() => [["filter", "active"]]),
    })),
}))


/* jest.mock("../../services/QuizAPI", () => ({
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
        _id: "123", name: "quizTestName", description: "quizTestDescription", manager: "123"
    }
]

describe('QuizView', () => {
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

        render(<QuizzesView />, { wrapper });
        //screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal

        // Verifica que el `role="list"` exista durante el estado de carga
        expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it('should show the data on succesful fetch', () => {
        (useQuery as jest.Mock).mockReturnValue({ // Mock dinámico
            data: mockData,
            isLoading: false,
            isError: false,
        });

        render(<QuizzesView />, { wrapper });
        //screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal

        // Verifica que el `role="list"` exista durante el estado de carga
        expect(screen.getByText(/quizTestName/i)).toBeInTheDocument()
    });

    it('should show noseque if data is empty', async () => {
        (useQuery as jest.Mock).mockReturnValue({ // Mock dinámico
            data: [],
            isLoading: false,
            isError: false,
        });

        render(<QuizzesView />, { wrapper });
        //screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal
        
        expect(screen.getByText(/No hay quizzes, aún.../i)).toBeInTheDocument()
    });
  
    it('should handle errors correctly', () => {

        (useQuery as jest.Mock).mockReturnValue({
            data: null,
            isError: true,
            isLoading: false,
        });

        render(<QuizzesView />, { wrapper });
        screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal

        expect(screen.getByText(/Algo ha fallado.../i)).toBeInTheDocument()

    });
  });