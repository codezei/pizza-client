const defaultState = {
    showLoginPopup: false,
    showRegistrationPopup: false,
    showLoader: false,
    currency: "₽"
}


const CHANGE_LOGIN_POPUP = "CHANGE_LOGIN_POPUP"
const CHANGE_REGISTARTION_POPUP = "CHANGE_REGISTARTION_POPUP"
const CHANGE_SHOW_LOADER = "CHANGE_SHOW_LOADER"

function changeLoginPopup () {
    return {
        type: CHANGE_LOGIN_POPUP
    }
}
function changeRegistrationPopup () {
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

function appReducer (state = defaultState, action) {
    switch (action.type) {
        case CHANGE_LOGIN_POPUP:
            return {
                ...state, showLoginPopup: !state.showLoginPopup, showRegistrationPopup: false
            }
        case CHANGE_REGISTARTION_POPUP:
            return {
                ...state, showRegistrationPopup: !state.showRegistrationPopup, showLoginPopup: false
            }
        case CHANGE_SHOW_LOADER:
            return {
                ...state, showLoader: action.payload
            }
        default:
            return state
    }
}


export {appReducer, changeLoginPopup, changeRegistrationPopup, changeShowLoader}