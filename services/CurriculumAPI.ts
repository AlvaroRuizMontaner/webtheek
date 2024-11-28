import api from "@/lib/axios";
import { Curriculum, CurriculumFormData } from "@/types/curriculum";
import { AxiosError } from "axios";

type CurriculumApiType = {
    endpointName: "createCurriculum" | "getCurriculums" | "getCurriculumById";
    formData?: CurriculumFormData,
    curriculumId?: Curriculum["_id"]
}


export const createCurriculum = async (formData: CurriculumApiType["formData"]) => {
    try {
      const response = await api.post(`/curriculums}`, formData)
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

export const curriculumBaseQuery = async (args: CurriculumApiType) => {
    // Detecta qué funcion usar según el endpoint
    if (args.endpointName === "createCurriculum") {
      return await createCurriculum(args.formData);
    }
    if (args.endpointName === "getCurriculums") {
      return await getCurriculums();
    }
    if (args.endpointName === "getCurriculumById") {
      return await getCurriculumById(args.curriculumId);
    }
    return { error: { status: 400, data: "Invalid endpoint" } };
}