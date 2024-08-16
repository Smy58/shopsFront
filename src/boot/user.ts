import axios from "axios"
import { signupUserParams, updateUserParams, updateUserPasswordParams } from "src/types/user"
import { postAxios } from "./axios"

const url = process.env.API_URL

export async function loginUser (params: { login: string, password: string}) {
    return await postAxios(`/login`, params)
        .then((res) => res.data)

}

export async function signupUser (params: signupUserParams) {
    return await postAxios(`/signup`, params)
    .then((res) => res.data)
}

export async function updateUserInfo (params: updateUserParams, userId: number) {

    return await postAxios(`/clients/${userId}`, params)
    .then((res) => res.data)
}

export async function updateUserPassword (params: updateUserPasswordParams, userId: number) {
    return await postAxios(`/clients/${userId}/password`, params)
    .then((res) => res.data)
}
