export interface ShopInterface {
    id: number;
    name: string;
    address: string;
    workTimeStart: string;
    workTimeEnd: string;
    waitingTime: number;
    image: string;
}

export class ShopClass implements ShopInterface {
    id: number;
    name: string;
    address: string;
    workTimeStart: string;
    workTimeEnd: string;
    waitingTime: number;
    image: string;

    constructor(item: any) {
        this.id = item.id;
        this.name = item.name;
        this.address = item.address;
        this.workTimeStart = item.workTimeStart;
        this.workTimeEnd = item.workTimeEnd;
        this.waitingTime = item.waitingTime;
        this.image = item.image;
    }
}
