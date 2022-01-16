const ADD_PRODUCT = "ADD_PRODUCT"
const DELETE_PRODUCT = "DELETE_PRODUCT"
const SET_PRODUCTS = "SET_PRODUCTS"
const EDIT_PRODUCT = "EDIT_PRODUCT"

const defaultState = {
    products: []
}

function productsReducer (state = defaultState, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state, products: [...state.products, action.payload]
            }
        case EDIT_PRODUCT:
            return {

                ...state, products: [...state.products.map(item=>{
                    return (
                        item._id === action.payload._id ? action.payload : item
                    )
                    
                })]
            }
        case DELETE_PRODUCT:
            return {
                ...state, products: [...state.products.filter(item=>{
                    return item._id !== action.payload
                })]
            }
        case SET_PRODUCTS:
            console.log(state.products)
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

function deleteProduct (id) {
    return {
        type: DELETE_PRODUCT,
        payload: id
    }
}
function setProducts(products) {
    return {
        type: SET_PRODUCTS,
        payload: products
    }
}
function editProduct(product) {
    return {
        type: EDIT_PRODUCT,
        payload: product
    }
}

export {productsReducer, addProduct, deleteProduct, setProducts, editProduct}