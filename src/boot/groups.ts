import axios from "axios"
import { getAxios } from "./axios";

const url = process.env.API_URL

export async function getGroups () {
    axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    return await getAxios(`/groups`, {})
        .then((res) => res.data)
}
