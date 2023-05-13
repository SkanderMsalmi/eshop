import { Product } from "src/app/core/models/product.model";
import { CartAction } from "../store";
import { ADDTOCART, REMOVEFROMCART, CLEARCART, DELETEFROMCART } from "../actions/cart.action";


export interface Cart{
    products : [
        {
            product : Product,
            quantity : Number
        }
    ];
    total : Number;
}

let initialState = {
    products : [],
    total : 0
}

export function cartReducer(state = initialState, action: CartAction){
    switch (action.type) {
        case ADDTOCART:
            let existingItem = state.products.find((item) => item.product.productId == action.payload.productId)
            if(existingItem){
                let updatedState = [];
                state.products.map(element => {
                    if(element.product.productId == action.payload.productId){
                        let quantity = element.quantity + 1;
                        updatedState.push({product : element.product, quantity : quantity})
                    }else{
                        updatedState.push(element);
                    }
                });
                return {
                    products : updatedState,
                    total : state.total + action.payload.price
                }
            }
            return {
                products : [...state.products, {product : action.payload , quantity : 1}],
                total : state.total + action.payload.price
            };
        case REMOVEFROMCART:
            let existingItems = state.products.find((item) => item.product.productId == action.payload.productId)
            if(existingItems){
                let updatedState = [];
                state.products.map(element => {
                    if(element.product.productId == action.payload.productId && element.quantity > 1){
                        let quantity = element.quantity - 1;
                        updatedState.push({product : element.product, quantity : quantity})
                    }else if(element.product.productId != action.payload.productId){
                        updatedState.push(element);
                    }
                });
                return {
                    products : updatedState,
                    total : state.total - action.payload.price
                }
            }
            return {
                products : [...state.products, {product : action.payload , quantity : 1}],
                total : state.total + action.payload.price
            };
        case CLEARCART:
            return {
                products : [],
                total : 0
            }
        case DELETEFROMCART:
            let deletedItem = state.products.find(element => element.product.productId == action.payload.productId);
            if(deletedItem){
                let updatedState = [];
                let total = 0
                state.products.map(element => {
                    if(element.product.productId != action.payload.productId){
                        updatedState.push(element);
                        total = total + ( element.product.price * element.quantity);
                    }
                })
                return {
                    products : updatedState,
                    total : total
                }
            }
        default:
            return state;
    }
}
