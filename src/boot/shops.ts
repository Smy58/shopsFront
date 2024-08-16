import axios from "axios";
import { getAxios } from "./axios";
const url = process.env.API_URL


export async function getShops () {

    return await getAxios(`/shops`, {})
        .then((res) => {
            return res.data
        })
}
