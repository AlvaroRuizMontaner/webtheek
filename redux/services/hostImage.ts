import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


type ImgurResponse = {
    status: number
    success: boolean
    data?: {
        link: string
    }
}

export const imageApi = createApi({
    reducerPath: 'imgurApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://api.imgur.com/3/',
      prepareHeaders: (headers) => {
        headers.set('Authorization', 'Client-ID 9949aebac6be83c'); // Únicamente agrega la autorización
        return headers; // No agregues Content-Type aquí
      },
    }),
    endpoints: (builder) => ({
      uploadImage: builder.mutation<ImgurResponse, FormData>({
        query: (formData) => ({
          url: 'image',
          method: 'POST',
          body: formData, // FormData se envía sin modificar
        }),
      }),
    }),
  });
  
  export const { useUploadImageMutation } = imageApi;