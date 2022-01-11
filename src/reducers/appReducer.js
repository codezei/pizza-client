const defaultState = {
    showLoginPopup: false,
    showRegistrationPopup: false
}


const CHANGE_LOGIN_POPUP = "CHANGE_LOGIN_POPUP"
const CANGE_REGISTARTION_POPUP = "CANGE_REGISTARTION_POPUP"

function changeLoginPopup () {
    return {
        type: CHANGE_LOGIN_POPUP
    }
}
function changeRegistrationPopup () {
    return {
        type: CANGE_REGISTARTION_POPUP
    }
}

function appReducer (state = defaultState, action) {
    switch (action.type) {
        case CHANGE_LOGIN_POPUP:
            return {
                ...state, showLoginPopup: !state.showLoginPopup, showRegistrationPopup: false
            }
        case CANGE_REGISTARTION_POPUP:
            return {
                ...state, showRegistrationPopup: !state.showRegistrationPopup, showLoginPopup: false
            }
        default:
            return state
    }
}


export {appReducer, changeLoginPopup, changeRegistrationPopup}