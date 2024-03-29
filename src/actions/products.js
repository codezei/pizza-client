import axios from 'axios'
import {API_URL} from "../config"
import {addProduct, deleteProduct, editProduct, setProducts} from "../reducers/productsReducer"
import {changeShowLoader} from "../reducers/appReducer"

function getProductsAction () {
    return async function (dispatch) {
        try {
            dispatch(changeShowLoader(true))
            const response = await axios.get(`${API_URL}api/product/get`)  

            dispatch(setProducts(response.data))
            dispatch(changeShowLoader(false))

        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(changeShowLoader(false))
        }
    }   
}

function addProductAction (product) {
    return async function (dispatch) {
        try {
            const formData = new FormData()
            formData.append('file', product['product-file'])
            formData.append('composition', JSON.stringify(product['product-composition']))
            formData.append('compositionAdd', JSON.stringify(product['product-composition-add']))
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
            formData.append('composition', JSON.stringify(product['product-composition']))
            formData.append('compositionAdd', JSON.stringify(product['product-composition-add']))
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
            dispatch(deleteProduct(id))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}



export {getProductsAction, addProductAction, deleteProductAction, editProductAction}