const defaultState = {
    currentUser: {},
    isAuth: false,
    isAdmin: false
}

const SET_USER = "SET_USER"
const LOG_OUT = "LOG_OUT"


function setUser (user) {
    return {
        type: SET_USER,
        payload: user
    }
}

function logOut () {
    return {
        type: LOG_OUT
    }
}



function userReducer (state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {...state, currentUser: action.payload, isAuth: true, isAdmin: action.payload.admin ? true : false}
        case LOG_OUT:
            localStorage.removeItem('token')
            return {
                ...state, isAuth: false, currentUser: {}, isAdmin:false
            }
        default:
            return state
    }
}


export {userReducer, setUser, logOut}