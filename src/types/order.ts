export interface OrderInterface {
    id: Number;
    totalCost: Number;
    shop: {
        id: Number;
        name: String;
        address: String;
        workTimeStart: String;
        workTimeEnd: String;
        waitingTime: Number;
        image: String;
    };
    status: {
        id: Number;
        name: String;
    };
    delivery: {
        id: Number;
        worker: {
            id: Number;
            name: String;
            shopId: Number;
            role: {
                id: Number;
                name: String;
            }
        }
    };
    client: {
        id: Number;
        name: String;
        address: String;
        phone: String;
        mail: String | null;
    };
}

export class OrderClass {
    id: Number;
    totalCost: Number;
    shop: {
        id: Number;
        name: String;
        address: String;
        workTimeStart: String;
        workTimeEnd: String;
        waitingTime: Number;
        image: String;
    };
    status: {
        id: Number;
        name: String;
    };
    delivery: {
        id: Number;
        worker: {
            id: Number;
            name: String;
            shopId: Number;
            role: {
                id: Number;
                name: String;
            }
        }
    };
    client: {
        id: Number;
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
