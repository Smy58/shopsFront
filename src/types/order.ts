import { ProductInterface } from "./product";

export interface OrderInterface {
    id: number;
    totalCost: number;
    shop: {
        id: number;
        name: String;
        address: String;
        workTimeStart: String;
        workTimeEnd: String;
        waitingTime: number;
        image: String;
    };
    status: {
        id: number;
        name: String;
    };
    delivery: {
        id: number;
        worker: {
            id: number;
            name: String;
            shopId: number;
            role: {
                id: number;
                name: String;
            }
        }
    };
    client: {
        id: number;
        name: String;
        address: String;
        phone: String;
        mail: String | null;
    };
}

export interface OrderPositionInterface {
    id: number;
    orderId: number;
    count: number;
    position: ProductInterface;
}

export class OrderClass {
    id: number;
    totalCost: number;
    shop: {
        id: number;
        name: String;
        address: String;
        workTimeStart: String;
        workTimeEnd: String;
        waitingTime: number;
        image: String;
    };
    status: {
        id: number;
        name: String;
    };
    delivery: {
        id: number;
        worker: {
            id: number;
            name: String;
            shopId: number;
            role: {
                id: number;
                name: String;
            }
        }
    };
    client: {
        id: number;
        name: String;
        address: String;
        phone: String;
        mail: String | null;
    };

    constructor(item: OrderInterface) {
        this.id = item.id;
        this.totalCost = item.totalCost;
        this.shop = item.shop;
        this.status = item.status;
        this.delivery = item.delivery;
        this.client = item.client;
    }
}
