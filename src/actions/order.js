import axios from "axios"
import {API_URL} from "../config"
import {addOrderAction, setOrdersAction ,setCurrentOrderAction} from "../reducers/orderReducer"
import {clearCart} from "../reducers/cartReducer"


function addOrder (order) {

    return async function (dispatch) {
        try {
            const formData = new FormData()
            formData.append('foods', JSON.stringify(order.foods))
            formData.append('user', JSON.stringify(order.user))
            const response = await axios.post(`${API_URL}api/order/add`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addOrderAction(response.data))
            dispatch(setCurrentOrderAction(response.data))
            dispatch(clearCart())
            console.log(response.data)

        } catch (e) {
            alert(e.response.data.message)
        }
    } 
}

function getOrders (id) {
    return async function (dispatch) {
        try {
            const formData = new FormData()
            formData.append('id', JSON.stringify(id))
            const response = await axios.post(`${API_URL}api/order/get`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setOrdersAction(response.data))
        } catch(e) {
            alert(e.response.data.message)
        }
    }
}

function getOrder (id) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${API_URL}api/order/get?id=${id}`)
            dispatch(setCurrentOrderAction(response.data))
            console.log(response.data)
        } catch(e) {
            alert(e.response.data.message)
        }
    }
}

export {addOrder, getOrders, getOrder}