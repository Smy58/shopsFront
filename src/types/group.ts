export interface GroupInterface {
    id: number;
    name: string;
}

export class GroupClass implements GroupInterface {
    id: number;
    name: string;

    constructor(item: any) {
        this.id = item.id;
        this.name = item.name;
    }
}
