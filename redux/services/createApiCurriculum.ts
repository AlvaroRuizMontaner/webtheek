import { curriculumBaseQuery } from "@/services/CurriculumAPI"
import { Curriculum, CurriculumFormData } from "@/types/curriculum"
import {createApi, /* fetchBaseQuery */} from "@reduxjs/toolkit/query/react"


export const curriculumApi = createApi({
    reducerPath: "userAPI",
    tagTypes: ["Curriculum"], // Define los tipos de tags usados
    baseQuery: curriculumBaseQuery, // fetchBaseQuery({baseUrl: "https://jsonplaceholder.typicode.com/users"}),
    endpoints: (builder) => ({
        createCurriculum: builder.mutation<Curriculum, {formData: CurriculumFormData}>({
            /* query: (formData) => ({
                url: "curriculums",
                method: "POST",
                body: formData
            }) */
            query: ({formData}) => ({
                endpointName: "createCurriculum",
                formData: formData
            }),
            invalidatesTags: (/* result, error, { formData } */) => [
                { type: "Curriculum", id: "LIST" }, // Invalida la lista para refrescar datos
            ],
        }),
        getCurriculums: builder.query<Curriculum[], null>({
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
        }),
    })
}) 

export const {useCreateCurriculumMutation, useGetCurriculumsQuery, useGetCurriculumByIdQuery} = curriculumApi

//const {data,error,isLoading,isFetching} = useGetCurriculumsQuery(null)