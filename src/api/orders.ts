import { ProductInterface } from "src/types/product"

const url = 'http://localhost:5000'

const getOrders = async (clientId: number) => {
    const data = new URLSearchParams();
    console.log(clientId);

    data.append('clientId', (clientId + ''))

    return await fetch(`${url}/orders` + `?${data.toString()}`, {
        method: 'GET',
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		}
    })
        .then((res) => res.json())
}

const getOrderPositions = async (orderId: Number) => {
    return await fetch(`${url}/orders` + `/${orderId.toString()}/positions`, {
        method: 'GET',
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		}
    })
        .then((res) => res.json())
}

const addOrder = async (shopProducts: ProductInterface[], totalSum: number, clientId: number) => {
    // console.log(products);

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

    return await fetch(`${url}/orders`, {
        method: 'POST',
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
}

export {
    getOrders,
    addOrder,
    getOrderPositions
}
