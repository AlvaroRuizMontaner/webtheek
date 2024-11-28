// axiosBaseQuery.ts
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError } from "axios";
import api from "./axios";

// Tipos para los argumentos que recibe el baseQuery
interface AxiosBaseQueryArgs {
    url: string; // Endpoint de la API
    method?: AxiosRequestConfig["method"]; // Método HTTP (GET, POST, etc.)
    data?: any; // Cuerpo de la solicitud
    params?: any; // Parámetros de la URL
  }
  
  // Tipos para el resultado del baseQuery
  type AxiosBaseQueryError = {
    status?: number; // Código de estado HTTP
    data?: any; // Datos adicionales del error
  };

// Definir un `baseQuery` usando Axios
const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs/* Argumentos */, unknown /*datos devueltos */, AxiosBaseQueryError /* Tipo de errores */> =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const result = await api({
        url,
        method,
        data,
        params,
      });
      return { data: result.data }; // Devuelve los datos en el formato esperado por RTK Query
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };

export default axiosBaseQuery;