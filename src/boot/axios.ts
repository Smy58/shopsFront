import axios from "axios";
const baseUrl = process.env.API_URL


export async function getAxios (url: string, data: Record<string, any>) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

    return await axios.get(`${baseUrl}${url}`, data)
}


export async function postAxios (url: string, data: Record<string, any>) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

    return await axios.post(`${baseUrl}${url}`, data)
}
