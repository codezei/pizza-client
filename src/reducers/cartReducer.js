const ADD_TO_CART = "ADD_TO_CART"
const REMOVE_FROM_CART = "REMOVE_FROM_CART"
const INCREMENT_COUNT_PRODUCT = "INCREMENT_COUNT_PRODUCT"
const DECREMENT_COUNT_PRODUCT = "DECREMENT_COUNT_PRODUCT"
const defaultState = {
    cartList: JSON.parse(localStorage.getItem('cartList')) || []
}

function cartReducer (state = defaultState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            localStorage.setItem('cartList', JSON.stringify([...state.cartList, action.payload]))
            return {
                ...state, cartList: [...state.cartList, action.payload]
            }
            
        case INCREMENT_COUNT_PRODUCT:
            localStorage.setItem('cartList', JSON.stringify(state.cartList.map((item)=>{
                if (item.key === action.payload.key) {
                    return {...item, count: item.count + 1}
                } else {
                    return item
                }
            })))
            return {
                ...state, cartList: state.cartList.map((item)=>{
                    if (item.key === action.payload.key) {
                        return {...item, count: item.count + 1}
                    } else {
                        return item
                    }
                })
            }
        case DECREMENT_COUNT_PRODUCT:
            localStorage.setItem('cartList', JSON.stringify(state.cartList.map((item)=>{
                if (item.key === action.payload.key) {
                    return {...item, count: item.count - 1}

                } else {
                    return item
                }
            })))
            return {
                ...state, cartList: state.cartList.map((item)=>{
                    if (item.key === action.payload.key) {
                        return {...item, count: item.count - 1}

                    } else {
                        return item
                    }
                })
            }
        case REMOVE_FROM_CART:
            localStorage.setItem('cartList', JSON.stringify(state.cartList.filter((item)=>{
                return item.key !== action.payload.key
            })))
            return {
                ...state, cartList: state.cartList.filter((item)=>{
                    return item.key !== action.payload.key
                })
            }
        default:
            return state
    } 
}

function addToCart (product) {
    return {
        type: ADD_TO_CART,
        payload: product
    }
}
function removeFromCart (product) {
    return {
        type: REMOVE_FROM_CART,
        payload: product
    }
}

function incrementCountProduct (product) {
    return {
        type: INCREMENT_COUNT_PRODUCT,
        payload: product 
    }
}
function decrementCountProduct (product) {
    return {
        type: DECREMENT_COUNT_PRODUCT,
        payload: product 
    }
}


export {cartReducer, addToCart, incrementCountProduct, decrementCountProduct, removeFromCart}