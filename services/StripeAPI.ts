import apiStripe from "@/lib/stripe";
import { isAxiosError } from "axios";

type StripeAPIType = {
    id: string;
    planType: string;
    unit_amount: number;
}


export async function createSession({id, planType, unit_amount}: Pick<StripeAPIType, "id" | "planType" | "unit_amount">) {
    const body = {
        id,
        planType,
        unit_amount
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