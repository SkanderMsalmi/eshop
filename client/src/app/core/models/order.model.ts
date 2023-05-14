import { User } from "./user.model";

export class Order {
    orderID : number;
    date : Date;
    products : any[];
    Status : string = "PENDING";
    totalAmount : number;
    shippingInfo : string;
    userId : User;
}