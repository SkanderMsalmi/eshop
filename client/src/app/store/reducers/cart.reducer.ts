import { CartAction } from "../store";
import { ADDTOCART, REMOVEFROMCART, CLEARCART, DELETEFROMCART, LOADCART } from "../actions/cart.action";
import { Product } from "src/app/core/models/product.model";


export interface Cart{
    products : [
        {
            productId : Product,
            quantity : number
        }
    ];
    total : number;
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
                let result = {
                    products : updatedState,
                    total : state.total + action.payload.price
                };
                localStorage.setItem("cart", JSON.stringify(result));
                return result;
            }
            let result = {
                products : [...state.products, {product : action.payload , quantity : 1}],
                total : state.total + action.payload.price
            };
            localStorage.setItem("cart", JSON.stringify(result));
            return result; 


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
                let result = {
                    products : updatedState,
                    total : state.total - action.payload.price
                };
                localStorage.setItem("cart",JSON.stringify(result));
                return result
            }
            result = {
                products : [...state.products, {product : action.payload , quantity : 1}],
                total : state.total + action.payload.price
            };
            localStorage.setItem("cart", JSON.stringify(result));
            return result;


        case CLEARCART:
            localStorage.removeItem("cart");
            return {
                products : [],
                total : 0
            }


        case LOADCART : 
            let cart = localStorage.getItem("cart");
            if (cart) {
                return JSON.parse(cart);
            }
            return state;


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
                let result = {
                    products : updatedState,
                    total : total
                };
                localStorage.setItem("cart", JSON.stringify(result));
                return result;
            }


        default:
            return state;
    }
}
