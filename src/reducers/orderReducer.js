
const defaultState = {
    orders: [],
    currentOrder: {}
}
const ADD_ORDER = 'ADD_ORDER'
const SET_ORDERS = 'SET_ORDERS'
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'

function orderReducer (state = defaultState, action) {
    switch (action.type) {
        case ADD_ORDER: 
            return {
                ...state, orders: [...state.orders, action.payload]
            }
        case SET_ORDERS:
            return {
                ...state, orders: action.payload
            }
        case SET_CURRENT_ORDER:
            return {
                ...state, currentOrder: action.payload
            }
        default:
            return state
    }
}

function addOrderAction (order) {
    return {
        type: ADD_ORDER,
        payload: order
    }
}
function setOrdersAction (orders) {
    return {
        type: SET_ORDERS,
        payload: orders
    }
}
function setCurrentOrderAction (order) {
    return {
        type: SET_CURRENT_ORDER,
        payload: order
    }
}



export {orderReducer, addOrderAction, setOrdersAction, setCurrentOrderAction}