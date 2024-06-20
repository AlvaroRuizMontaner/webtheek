import api from "@/lib/axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "@/types";
import { isAxiosError } from "axios";


export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = "/auth/create-account"
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
            throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = "/auth/confirm-account"
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
            throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function RequestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = "/auth/request-code"
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
            throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = "/auth/login"
        const { data } = await api.post<string>(url, formData)
        localStorage.setItem("AUTH_TOKEN", data)
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
            throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = "/auth/forgot-password"
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
            throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function validateToken(formData: ConfirmToken) {
    try {
        const url = "/auth/validate-token"
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
            throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function updatePasswordWithToken({formData, token}: {formData: NewPasswordForm, token: ConfirmToken["token"]}) {
    try {
        const url = `/auth/update-password/${token}`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
            throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}