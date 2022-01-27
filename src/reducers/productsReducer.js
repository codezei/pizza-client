const ADD_PRODUCT = "ADD_PRODUCT"
const DELETE_PRODUCT = "DELETE_PRODUCT"
const SET_PRODUCTS = "SET_PRODUCTS"
const EDIT_PRODUCT = "EDIT_PRODUCT"

const defaultState = {
    products: [],
    currentProduct: {},
    addComposition: [
        {
            name: "Моцарелла",
            value: "mozzarella",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Сыр"

        },
        {
            name: "Шампиньоны",
            value: "champignon",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Компонент"

        },
        {
            name: "Огурцы маринованные",
            value: "cucumbers",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Компонент"

        },
        {
            name: "Паперони",
            value: "paperoni",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Мясо"

        },
        {
            name: "Томатный соус",
            value: "tomato-sauce",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Компонент"

        },
        {
            name: "Красный лук",
            value: "red-onion",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Компонент"

        },
        {
            name: "Сладкий соус",
            value: "sweet-sauce",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Компонент"

        },
        {
            name: "Курица",
            value: "chicken",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Мясо"

        },
        {
            name: "Бекон",
            value: "bacon",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Мясо"

        },
        {
            name: "Ветчина",
            value: "ham",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Мясо"

        },
        {
            name: "Маслины",
            value: "olives",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Компонент"

        },
        {
            name: "Красный перец",
            value: "red-pepper",
            checked: false,
            add: false,
            put: false,
            price: 50,
            category: "Компонент"

        }
    ]
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