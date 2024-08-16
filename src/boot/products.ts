import axios from "axios";
import { getAxios } from "./axios";

const url = process.env.API_URL

export async function getProducts (shopId: number, page: number, params: { groupId?: number, searchInput?: string}) {
    const data = new URLSearchParams();
    data.append('shopId', (shopId + ''))
    data.append('page', (page + ''))
    if (params.groupId) {
        data.append('groupId', (params.groupId + ''))
    }
    if (params.searchInput) {
        data.append('searchInput', (params.searchInput + ''))
    }

    return await getAxios(`/shopProducts` + `?${data.toString()}`, {})
        .then((res) => res.data)
}

