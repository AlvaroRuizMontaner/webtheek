import api from "@/lib/axios";
import { Curriculum, CurriculumFormData } from "@/types/curriculum";
import axios, { AxiosError } from "axios";

type CurriculumApiType = {
    endpointName: "createCurriculum" | "getCurriculums" | "getCurriculumById";
    formData?: CurriculumFormData,
    curriculumId?: Curriculum["_id"]
}


export const createCurriculum = async (formData: CurriculumApiType["formData"]) => {
    try {
      const response = await api.post(`/curriculums`, formData)
      return { data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        error: {
          status: axiosError.response?.status || 500,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

export const getCurriculums = async () => {
  try {
    const response = await api.get("/curriculums")
    return { data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      error: {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || axiosError.message,
      },
    };
  }
};

export const getCurriculumById = async (curriculumId: CurriculumApiType["curriculumId"]) => {
  try {
    const response = await api.get(`/curriculums/${curriculumId}`)
    return { data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      error: {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || axiosError.message,
      },
    };
  }
};

// Base Query

export const axiosBaseQuery =
    ({ baseUrl }: { baseUrl: string }) =>
    async ({ url, method, data }: { url: string; method: string; data?: any }) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
            });
            return { data: result.data };
        } catch (axiosError: any) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status || 500,
                    data: err.response?.data || err.message,
                },
            };
        }
    };