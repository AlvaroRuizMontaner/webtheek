import { configureStore } from "@reduxjs/toolkit"
import {curriculumReducer} from "./features/curriculumSlice"
import { curriculumApi } from "./services/createApiCurriculum"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer: {
        curriculumReducer,
        [curriculumApi.reducerPath]: curriculumApi.reducer //"curriculumAPI": curriculumApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([curriculumApi.middleware])
})

setupListeners(store.dispatch)

// ReturnType toma una función como argumento y devuelve el tipo que retorna esa función.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch