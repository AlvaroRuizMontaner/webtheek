import { axiosBaseQuery } from "@/services/CurriculumAPI";
import { Curriculum, CurriculumFormData } from "@/types/curriculum";
import { createApi, /* fetchBaseQuery */ } from "@reduxjs/toolkit/query/react";


export const curriculumApi = createApi({
    reducerPath: "curriculumApi",
    baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:4000/api" }),
    tagTypes: ["Curriculum"], // Define aquí tus tipos de tags
    endpoints: (builder) => ({
        createCurriculum: builder.mutation<Curriculum, CurriculumFormData>({ // EL primer parametro generico define el tipo de la respuesta y el segundo el tipo de lo que se envia
            query: (formData) => ({
                url: "/curriculums",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: [{ type: "Curriculum", id: "LIST" }],
        }),
    }),
});
        
/*         getCurriculums: builder.query<Curriculum[], null>({
            //query: () => "curriculums" // https://domain/users
            query: () => ({
                endpointName: "getCurriculums"
            }),
            providesTags: [{ type: "Curriculum", id: "LIST" }], // Proporciona una tag para la lista de curriculums
            transformResponse: response => response.sort()
        }),
        getCurriculumById: builder.query<Curriculum, {curriculumId: string}>({
            query: ({curriculumId}) => ({
                endpointName: "getCurriculumById",
                curriculumId: curriculumId
            }),
            providesTags: (result, error, { curriculumId }) => [
                { type: "Curriculum", id: curriculumId }, // Proporciona una tag dinámica por ID
            ],
        }), */
export const {useCreateCurriculumMutation/* , useGetCurriculumsQuery, useGetCurriculumByIdQuery */} = curriculumApi

//const {data,error,isLoading,isFetching} = useGetCurriculumsQuery(null)