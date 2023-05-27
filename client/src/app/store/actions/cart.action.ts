import { Product } from "src/app/core/models/product.model";


export const ADDTOCART = "[Cart] ADD_TO_CART";
export const REMOVEFROMCART = "[Cart] REMOVE_FROM_CART";
export const DELETEFROMCART ="[Cart] DELETE_FROM_CART";
export const CLEARCART = "[Cart] CLEAR_CART";

export class AddToCartAction{
    type : string = ADDTOCART;
    payload : Product;

    constructor(payload : Product){
        this.payload = payload;
    }
}

export class RemoveFromCartAction{
    type : string = REMOVEFROMCART;
    payload : Product;

    constructor(payload : Product){
        this.payload = payload;
    }
}

export class DeleteFromCartAction {
    type : string = DELETEFROMCART;
    payload : Product;

    constructor(payload : Product) {
        this.payload = payload;
    }
}

export class ClearCartAction{
    type : string = CLEARCART;
    payload : any;
}