
const defaultState = {
    order: {
        
    }
}

const ADD_ORDER = 'ADD_ORDER'


function orderReducer (state = defaultState, action) {
    switch (action.type) {
        case ADD_ORDER: 
            return {
                ...state, order: action.payload
            }



        default:
            return state
    }
}


export {orderReducer}