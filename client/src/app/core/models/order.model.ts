import { User } from "./user.model";

export class Order {
    _id : number;
    date : Date;
    products : any[];
    status : string = "PENDING";
    totalAmount : number;
    shippingInfo : string;
    userId : User;
}