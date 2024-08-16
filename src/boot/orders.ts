import axios from "axios";
import { ProductInterface } from "src/types/product"
import { getAxios, postAxios } from "./axios";

const url = process.env.API_URL

export async function getOrders (clientId: number) {
    const data = new URLSearchParams();

    data.append('clientId', (clientId + ''))

    return await getAxios(`/orders` + `?${data.toString()}`, {})
        .then((res) => res.data)
}

export async function getOrderPositions (orderId: Number) {
    return await getAxios(`/orders` + `/${orderId.toString()}/positions`, {})
        .then((res) => res.data)
}

export async function addOrder (shopProducts: ProductInterface[], totalSum: number, clientId: number) {

    const positions = shopProducts.map((item) => {
        return {
            positionId: item.id,
            count: item.count
        }
    })

    const shopId = shopProducts[0].shopId

    const data = {
        totalCost: totalSum,
        shopId: shopId,
        statusId: 2,
        deliveryId: Math.floor(Math.random() * 5),
        clientId: clientId,
        positions: positions
    }

    return await postAxios(`/orders`, data)
        .then((res) => res.data)
}
