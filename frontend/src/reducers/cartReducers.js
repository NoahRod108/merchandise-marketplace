import { CART_ADD_ITEM, CART_PAYMENT, CART_REMOVE_ITEM, CART_RESET, CART_SHIPPING_ADDRESS } from '../constants/cartConstants';

const INITIAL_CART_STATE = { cartItems: [], shippingAddress: {}};

export const cartReducer = (state = INITIAL_CART_STATE, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const itemExists = state.cartItems.find( x => x.product === item.product)

            if(itemExists){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === itemExists.product ? item : x)
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]}
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
            case CART_SHIPPING_ADDRESS:
                return{
                    ...state,
                    shippingAddress: action.payload,
                }
            case CART_PAYMENT:
                return{
                    ...state,
                    payment: action.payload,
                }
            case CART_RESET:
                return{
                     cartItems: []
                }
        default:
            return state
    }
}