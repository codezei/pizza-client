import axios from "axios"
import {setUser} from "../reducers/userReducer"
import {API_URL} from "../config"
import {closeLoginPopup, closeRegistrationPopup} from "../reducers/appReducer"
import { logOut } from "../reducers/userReducer"

function registration (email, password) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${API_URL}api/auth/registration`, {email, password})
            // console.log(response)
            dispatch(closeRegistrationPopup())
            dispatch(login(email, password))
        } catch (e) {
            alert(e.response.data.message)
        }
    }

}

function login (email, password) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {email, password})
            localStorage.setItem('token', response.data.token)
            dispatch(setUser(response.data.user))
            dispatch(closeLoginPopup())
           
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

function auth () {
    return async function (dispatch) {
        try {
            if (!localStorage.getItem('token')) {
                return
            }
            const response = await axios.get(`${API_URL}api/auth/auth`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setUser(response.data.user))

        } catch (e) {
            alert(e.response.data.message)
            dispatch(logOut())
        }
    }
}

function edit (userData) {
    return async function (dispatch) {
        try {
            if (!localStorage.getItem('token')) {
                return
            }
            const response = await axios.post(`${API_URL}api/auth/edit`, userData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setUser(response.data.user))
            console.log(response.data.user)

        } catch (e) {
            alert(e.response.data.message)
        }
    }
}



export {registration, login, auth, edit}