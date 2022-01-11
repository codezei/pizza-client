const defaultState = {
    currentUser: {},
    isAuth: false
}

const SET_USER = "SET_USER"


function setUser (user) {
    return {
        type: SET_USER,
        payload: user
    }
}


function userReducer (state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {...state, currentUser: action.payload, isAuth: true}
        default:
            return state
    }
}


export {userReducer, setUser}