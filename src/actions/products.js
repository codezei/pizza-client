import axios from 'axios'
import {setProducts} from '../reducers/productsReducer'
import {API_URL} from "../config"
import {addProduct, deleteProduct, editProduct} from "../reducers/productsReducer"

function getProductsAction () {
    return async function (dispatch) {
        try {
            
            const response = await axios.get(`${API_URL}api/product/get`)  
            dispatch(setProducts(response.data))

        } catch (e) {
            alert(e.response.data.message)
        }
    }   
}

function addProductAction (product) {
    return async function (dispatch) {
        try {
            const formData = new FormData()
            formData.append('file', product['product-file'])
            formData.append('composition', product['product-composition'])
            formData.append('price', product['product-price'])
            formData.append('name', product['product-name'])
            const response = await axios.post(`${API_URL}api/product/add`, formData,  {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })  
            dispatch(addProduct(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
function editProductAction (product) {
    return async function (dispatch) {
        try {
            const formData = new FormData()
            formData.append('file', product['product-file'])
            formData.append('id', product.id)
            formData.append('composition', product['product-composition'])
            formData.append('price', product['product-price'])
            formData.append('name', product['product-name'])
            const response = await axios.post(`${API_URL}api/product/edit`, formData,  {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })  
            dispatch(editProduct(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

function deleteProductAction (id) {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`${API_URL}api/product/delete?id=${id}`,  {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }) 
            console.log(response) 
            dispatch(deleteProduct(id))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}



export {getProductsAction, addProductAction, deleteProductAction, editProductAction}