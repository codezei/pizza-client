import "./Admin.scss"
import {deleteProductAction} from "../../actions/products"
import {useDispatch, useSelector} from "react-redux"
import React from 'react'
import {API_URL} from "../../config"
import {editIcon, deleteIcon} from "../../assets/icons/iconsSvg"
import AddProduct from "./addProduct/AddProduct"
import EditProduct from "./editProduct/EditProduct"


function Admin () {
    const dispatch = useDispatch()
    const products = useSelector(state=>{return state.products.products})
    const [modeEditProduct, setModeEditProduct] = React.useState(false)
    const [currentProduct, setCurrentProduct] = React.useState({})

    function deleteProductHandler(id) {
        dispatch(deleteProductAction(id))
    }
    function editProductHundler (product) {
        setCurrentProduct(product)
    }
    function setModeEditProductHundler () {
        setModeEditProduct(true)
    }
    function setModeAddProductHundler () {
        setModeEditProduct(false)
    }

    function transformDate (date) {
        let reg = /.{10}/
        let res = date.match(reg)
        return res
    }


    return (
        <div className="admin">
            <div className="container">
                {modeEditProduct ? <EditProduct product={currentProduct} setModeAddProductHundler={setModeAddProductHundler} /> : <AddProduct/>}
                <div className="admin-list">
                    <h3 className="admin-list__title">Список товаров</h3>
                    { products.length ?
                    <table className={`admin-product ${modeEditProduct ? 'admin-product--edit' : ''}`}>
                        <tbody>
                            <tr className="admin-product__row">
                                <th className="admin-product__col">№</th>
                                <th className="admin-product__col">Изображение</th>
                                <th className="admin-product__col">Название</th>
                                <th className="admin-product__col">Состав</th>
                                <th className="admin-product__col">Стоимость</th>
                                <th className="admin-product__col">Дата</th>
                                <th className="admin-product__col">Редактировать</th>
                                <th className="admin-product__col">Удалить</th>
                            </tr>
                            {
    
                                products.map((item, index)=>{
                                    return (
                                    <tr className="admin-product__row" key={`product-${index}`}>
                                        <td className="admin-product__col">
                                                        {index + 1}
                                        </td>
                                        <td className="admin-product__col">
                                            <img src={`${API_URL}/${item.imgPath}`} alt="" className="admin-product__img" />         
                                        </td>
                                        <td className="admin-product__col">
                                            <p className="admin-product__name">{item.name}</p>       
                                        </td>
                                        <td className="admin-product__col">
                                            <p className="admin-product__composition">{item.composition}</p>
                                        </td>
                                        <td className="admin-product__col">
                                            <p className="admin-product__price">{item.price}</p>
                                        </td>
                                        <td className="admin-product__col">
                                            <p className="admin-product__date">{transformDate(item.date)}</p>
                                        </td>
                                        <td className="admin-product__col tcenter">
                                            <button className="admin-product__btn btn" type="button" onClick={()=>{setModeEditProductHundler();editProductHundler(item)}}>{editIcon}</button>
                                        </td>
                                        <td className="admin-product__col tcenter">
                                            <button className="admin-product__btn btn" type="button" onClick={()=>{deleteProductHandler(item._id)}}>{deleteIcon}</button>
                                        </td>

                                    </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    :
                    "Список товаров пуст"
                    }


                </div>

            </div>
        </div>
    )
}

export default Admin