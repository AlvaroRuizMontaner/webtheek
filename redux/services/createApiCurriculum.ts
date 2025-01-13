import { axiosBaseQuery } from "@/services/CurriculumAPI";
import { Curriculum, CurriculumCreateFormData } from "@/types/curriculum";
import { createApi, /* fetchBaseQuery */ } from "@reduxjs/toolkit/query/react"; // Si se importa la version sin el /react no se crearan los hooks del final

export const curriculumApi = createApi({
    reducerPath: "curriculumApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["Curriculum"], // Define aquí tus tipos de tags
    endpoints: (builder) => ({
        createCurriculum: builder.mutation<string, CurriculumCreateFormData>({ // El primer parametro generico define el tipo de la respuesta y el segundo el tipo de lo que se envia
            query: (formData) => ({
                url: "/curriculums",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: [{ type: "Curriculum", id: "LIST" }],
        }),
        getCurriculums: builder.query<Curriculum[], null>({
            //query: () => "curriculums" // https://domain/users
            query: () => ({
                url: "/curriculums",
                method: "GET",
            }),
            providesTags: [{ type: "Curriculum", id: "LIST" }], // Proporciona una tag para la lista de curriculums
            transformResponse: response => response.sort()
        }),
        getCurriculumById: builder.query<Curriculum, {curriculumId: string}>({
            query: ({curriculumId}) => ({
                url: `curriculums/${curriculumId}`,
                method: "GET"
            }),
            providesTags: (result, error, { curriculumId }) => [ //  const { data, error, isLoading } = useGetCurriculumByIdQuery({ curriculumId: "12345" });
                { type: "Curriculum", id: curriculumId }, // Proporciona una tag dinámica por ID
            ],
        }),
        getPublicCurriculumById: builder.query<Curriculum, {curriculumId: string}>({
            query: ({curriculumId}) => ({
                url: `browse/curriculums/${curriculumId}`,
                method: "GET"
            }),
            providesTags: (result, error, { curriculumId }) => [ //  const { data, error, isLoading } = useGetCurriculumByIdQuery({ curriculumId: "12345" });
                { type: "Curriculum", id: curriculumId }, // Proporciona una tag dinámica por ID
            ],
        }),
        editCurriculumContent: builder.mutation<Curriculum, {curriculumId: string, formData: Curriculum["content"]}>({ // El primer parametro generico define el tipo de la respuesta y el segundo el tipo de lo que se envia
            query: ({ curriculumId, formData }) => {
                console.log("Datos enviados a la API:", formData);  // Log de depuración
                
                return {
                    url: `/curriculums/${curriculumId}`,
                    method: "PUT",
                    data: {
                        content: formData
                    }
                };
            },
            invalidatesTags: (result, error, { curriculumId }) => [
                { type: "Curriculum", id: curriculumId }
            ],
        }),
        editCurriculumName: builder.mutation<string, {curriculumId: string, formData: {name: string}}>({ // El primer parametro generico define el tipo de la respuesta y el segundo el tipo de lo que se envia
            query: ({formData, curriculumId}) => ({
                url: `/curriculums/${curriculumId}/name`,
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: (result, error, { curriculumId }) => [
                { type: "Curriculum", id: curriculumId },
                { type: "Curriculum", id: "LIST" }
            ],
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
export const { 
    useCreateCurriculumMutation,
    useGetCurriculumsQuery,
    useGetCurriculumByIdQuery,
    useGetPublicCurriculumByIdQuery,
    useEditCurriculumContentMutation,
    useEditCurriculumNameMutation,
    useDeleteCurriculumMutation,
    useCheckPasswordMutation
} = curriculumApi

//const {data,error,isLoading,isFetching} = useGetCurriculumsQuery(null)