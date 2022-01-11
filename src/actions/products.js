import axios from 'axios'
import {setFiles} from '../reducers/productsReducer'

function getProducts () {
    return async function (dispatch) {
        try {

            const response = await axios.get('', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })  


            dispatch(setFiles(response.data))

        } catch (e) {

        }
    }   
}


export {getProducts}