const defaultState = {
    showLoginPopup: false,
    showRegistrationPopup: false,
    showFilterPopup: false,
    showCartPopup: false,
    showLoader: false,
    currency: "₴",
    productSize: [
        {   
            id: "size-20",
            name: "20 см",
            value: 20
        },
        {
            id: "size-28",
            name: "28 см",
            value: 28
        },
        {
            id: "size-33",
            name: "33 см",
            value: 33
        }
    ],
    productDough: [
        {
            id: "dough-traditional", 
            name: "Традиционное",
            value: "traditional"
        },
        {
            id: "dough-thin", 
            name: "Тонкое",
            value: "thin"
        }
    ]
}


const CHANGE_LOGIN_POPUP = "CHANGE_LOGIN_POPUP"
const CHANGE_REGISTARTION_POPUP = "CHANGE_REGISTARTION_POPUP"
const CHANGE_FILTER_POPUP = "CHANGE_FILTER_POPUP"
const CHANGE_CART_POPUP = "CHANGE_CART_POPUP"
const CHANGE_SHOW_LOADER = "CHANGE_SHOW_LOADER"
const CLOSE_LOGIN_POPUP = "CLOSE_LOGIN_POPUP"
const CLOSE_REGISTARTION_POPUP = "CLOSE_REGISTARTION_POPUP"

function changeLoginPopup () {
    return {
        type: CHANGE_LOGIN_POPUP
    }
}
function closeLoginPopup () {
    return {
        type: CLOSE_LOGIN_POPUP
    }
}
function changeRegistrationPopup () {
    return {
        type: CHANGE_REGISTARTION_POPUP
    }
}
function closeRegistrationPopup () {
    return {
        type: CHANGE_REGISTARTION_POPUP
    }
}
function changeShowLoader (value) {
    return {
        type: CHANGE_SHOW_LOADER,
        payload: value
    }
}
function changeFilterPopup () {
    return {
        type: CHANGE_FILTER_POPUP
    }
}
function changeCartPopup () {
    return {
        type: CHANGE_CART_POPUP
    }
}

function appReducer (state = defaultState, action) {
    switch (action.type) {
        case CHANGE_LOGIN_POPUP:
            return {
                ...state, showLoginPopup: !state.showLoginPopup, showRegistrationPopup: false
            }
        case CLOSE_LOGIN_POPUP:
            return {
                ...state, showLoginPopup: false
            }
        case CHANGE_REGISTARTION_POPUP:
            return {
                ...state, showRegistrationPopup: !state.showRegistrationPopup, showLoginPopup: false
            }
        case CLOSE_REGISTARTION_POPUP:
            return {
                ...state, showRegistrationPopup: false
            }
        case CHANGE_FILTER_POPUP:
            return {
                ...state, showFilterPopup: !state.showFilterPopup
            }
        case CHANGE_CART_POPUP:
            return {
                ...state, showCartPopup: !state.showCartPopup
            }
        case CHANGE_SHOW_LOADER:
            return {
                ...state, showLoader: action.payload
            }
        default:
            return state
    }
}


export {appReducer, changeLoginPopup, changeRegistrationPopup, changeShowLoader, changeFilterPopup, changeCartPopup, closeLoginPopup, closeRegistrationPopup}