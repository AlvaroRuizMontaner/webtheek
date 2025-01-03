import api from "@/lib/axios";
import { AxiosError } from "axios";

// Base Query

export const axiosBaseQuery = async ({ url, method, data }: { url: string; method: string; data?: any }) => {
  try {
    const result = await api({
        url,
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