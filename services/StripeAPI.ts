import apiStripe from "@/lib/stripe";
import { isAxiosError } from "axios";

type StripeAPIType = {
    id: string;
    name: string;
}


export async function createSession({id, name}: Pick<StripeAPIType, "id" | "name">) {
    const body = {
        id,
        name
    }
    try {
        const url = `/checkout`
        const { data } = await apiStripe.post(url, body)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}