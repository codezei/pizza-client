import axios from "axios"
import {setUser} from ""
import {API_URL} from "../config"

async function registration (email, password) {
    try {
        const response = await axios.post(`${API_URL}/auth/registration`, {email, password})
        console.log(response)
    } catch (e) {
        alert(e.response.data.message)
    }
}

function login (email, password) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${API_URL}/auth/ligon`, {email, password})
            localStorage.setItem('token', response.data.token)
            dispatch(setUser(response.data))
            console.log(response)
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
            const response = await axios.get(`${API_URL}/auth/auth`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setUser(response.data.user))

        } catch (e) {
            alert(e.response.data.message)
        }
    }
}


export {registration, login, auth}