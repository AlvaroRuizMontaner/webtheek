import { configureStore } from "@reduxjs/toolkit"
import {curriculumReducer} from "./features/curriculumSlice"
import {eosReducer} from "./features/eosSlice"
import { curriculumApi } from "./services/createApiCurriculum"
import { setupListeners } from "@reduxjs/toolkit/query"
import { imageApi } from "./services/hostImage"

export const store = configureStore({
    reducer: {
        curriculumReducer,
        eosReducer,
        [curriculumApi.reducerPath]: curriculumApi.reducer, //"curriculumAPI": curriculumApi.reducer
        [imageApi.reducerPath]: imageApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([curriculumApi.middleware, imageApi.middleware])
})

setupListeners(store.dispatch)

// ReturnType toma una función como argumento y devuelve el tipo que retorna esa función.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch