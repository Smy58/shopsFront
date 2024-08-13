export interface ProductInterface {
    id: number;
    shopId: number;
    cost: number;
    count?: number;
    product: {
        id: number;
        name: string;
        description: string;
        vendorCost: number;
        image: string;
        group: {
            id: number;
            name: string;
        }
    }
}

export class ProductClass implements ProductInterface {
    id: number;
    shopId: number;
    cost: number;
    count?: number;
    product: {
        id: number;
        name: string;
        description: string;
        vendorCost: number;
        image: string;
        group: {
            id: number;
            name: string;
        }
    }

    constructor(item: any) {
        this.id = item.id;
        this.shopId = item.shopId;
        this.cost = item.cost;
        this.product = item.product;

    }
}
