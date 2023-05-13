import { Product } from "../core/models/product.model";
import { Cart, cartReducer } from "./reducers/cart.reducer";


export interface StoreInterface{
    cart : Cart
}

export interface CartAction{
    type : string,
    payload : Product
}

export const reducers = {
    cart : cartReducer
}

