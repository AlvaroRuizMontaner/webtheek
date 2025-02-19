import { render, screen } from "@testing-library/react";
import CurriculumsView from "./CurriculumsView";
import {Provider as ReduxProvider} from "react-redux"
import { configureStore } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/CurriculumAPI";
import { Curriculum } from "@/types/curriculum";
const { useGetCurriculumsQuery } = jest.requireMock("../../redux/services/createApiCurriculum");
import { describe, expect, it } from '@jest/globals';


const curriculumApi = createApi({
    reducerPath: "curriculumApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["Curriculum"], // Define aquí tus tipos de tags
    endpoints: (builder) => ({
        getCurriculums: builder.query<Curriculum[], null>({
            //query: () => "curriculums" // https://domain/users
            query: () => ({
                url: "/curriculums",
                method: "GET",
            }),
            providesTags: [{ type: "Curriculum", id: "LIST" }], // Proporciona una tag para la lista de curriculums
            transformResponse: response => response.sort()
        }),
        deleteCurriculum: builder.mutation<null, {curriculumId: string}>({
            query: ({curriculumId}) => ({
                url: `/curriculums/${curriculumId}`,
                method: "DELETE"
            }),
            invalidatesTags: [{ type: "Curriculum", id: "LIST" }],
        }),
        checkPassword: builder.mutation<null, {password: string}>({
            query: (formData) => {
                return {
                    url: "/auth/check-password",
                    method: "POST",
                    data: formData
                }
            }
        }),
    }),
});

jest.mock("../../redux/services/createApiCurriculum", () => ({
    curriculumApi: {
      reducerPath: "curriculumApi",
      reducer: jest.fn(),
      middleware: jest.fn(),
    },
}));

const store = configureStore({
    reducer: {
      [curriculumApi.reducerPath]: curriculumApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(curriculumApi.middleware),
  });

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => "/curriculums"),
    useRouter: jest.fn(() => ({
        route: '/curriculums',
        pathname: '/curriculums',
        query: {},
        asPath: '/curriculums',
    })),
    useSearchParams: jest.fn(() => ({
        get: jest.fn((key) => (key === "filter" ? "active" : null)),
        entries: jest.fn(() => [["filter", "active"]]),
    })),
}))


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

  jest.mock("../../redux/services/createApiCurriculum", () => ({
    useGetCurriculumsQuery: jest.fn(),
    useDeleteCurriculumMutation: jest.fn(() => [
        jest.fn(), // La función de mutación
        { isLoading: false, isError: false }, // El objeto de estado
    ]),
    useCheckPasswordMutation: jest.fn(() => [
        jest.fn(), // La función de mutación
        { isLoading: false, isError: false }, // El objeto de estado
    ])
  }));

//defining React Query Wrapper

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ReduxProvider store={store}>{children}</ReduxProvider>
);


const mockData = [
    {
        _id: "123", name: "curriculumTestName", content: [], manager: "123"
    }
]

describe('CurriculumView', () => {
    // beforeEach test BeforeEach function will run and clear the mock and UseQuery
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should show loading when isLoading is true', () => {
        (useGetCurriculumsQuery as jest.Mock).mockReturnValue({ // Mock dinámico
            data: null,
            isLoading: true,
            isError: false,
        });

        render(<CurriculumsView />, { wrapper });
        //screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal

        // Verifica que el `role="list"` exista durante el estado de carga
        expect(screen.getByRole("loading-list")).toBeInTheDocument();
    });

    it('should show the data on succesful fetch', () => {
        (useGetCurriculumsQuery as jest.Mock).mockReturnValue({ // Mock dinámico
            data: mockData,
            isLoading: false,
            isError: false,
        });

        render(<CurriculumsView />);
        //screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal

        // Verifica que el `role="list"` exista durante el estado de carga
        expect(screen.getByText(/curriculumTestName/i)).toBeInTheDocument()
    });

/*     it('should show noseque if data is empty', async () => {
        (useGetCurriculumsQuery as jest.Mock).mockReturnValue({ // Mock dinámico
            data: [],
            isLoading: false,
            isError: false,
        });

        render(<CurriculumsView />, { wrapper });
        //screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal
        
        expect(screen.getByText(/No hay curriculums, aún.../i)).toBeInTheDocument()
    }); */
  
/*     it('should handle errors correctly', () => {

        (useGetCurriculumsQuery as jest.Mock).mockReturnValue({
            data: null,
            isError: true,
            isLoading: false,
        });

        render(<CurriculumsView />, { wrapper });
        screen.debug(); // Esto imprimirá el DOM renderizado en tu terminal

        expect(screen.getByText(/Algo ha fallado.../i)).toBeInTheDocument()

    }); */
  });