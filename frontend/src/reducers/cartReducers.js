import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

const INITIAL_CART_STATE = { cartItems: []};

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
            return
        default:
            return state
    }
}