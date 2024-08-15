export interface UserInterface {
    id: number;
    name: string;
    address: string;
    phone: string;
    mail: string;
}

export interface signupUserParams {
    name: string;
    address: string;
    phone: string;
    mail: string;
    password: string;
}

export interface updateUserParams {
    name: string;
    address: string;
    phone: string;
    mail: string;
}

export interface updateUserPasswordParams {
    oldPassword: string;
    newPassword: string;
}

export class UserClass implements UserInterface {
    id: number;
    name: string;
    address: string;
    phone: string;
    mail: string;

    constructor(item: any) {
        this.id = item.id;
        this.name = item.name;
        this.address = item.address;
        this.phone = item.phone;
        this.mail = item.mail
    }
}
