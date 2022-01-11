const ADD_PRODUCT = "ADD_PRODUCT"
const REMOVE_PRODUCT = "REMOVE_PRODUCT"
const SET_PRODUCTS = "SET_PRODUCTS"

const defaultState = {
    products: []
}

function productsReducer (state = defaultState, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state, products: [...state.products, action.payload]
            }
        case REMOVE_PRODUCT:
            return {
                ...state, products: [...state.products.filter(item=>{
                    return item.id !== action.payload.id
                })]
            }
        case SET_PRODUCTS:
            return {
                ...state, products: action.payload
            }
        default: 
            return state
    }
}

function addProduct (product) {
    return {
        type: ADD_PRODUCT,
        payload: product
    }
}

function removeProduct (product) {
    return {
        type: REMOVE_PRODUCT,
        payload: product
    }
}
function setProducts(products) {
    return {
        type: SET_PRODUCTS,
        payload: products
    }
}

export {productsReducer, addProduct, removeProduct, setProducts}