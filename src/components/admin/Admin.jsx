import "./Admin.scss"
import {deleteProductAction} from "../../actions/products"
import {useDispatch, useSelector} from "react-redux"
import React from 'react'
import AddProduct from "./addProduct/AddProduct"
import EditProduct from "./editProduct/EditProduct"
import AdminProductList from "./AdminProductList"
import AdminOrderList from "./AdminOrderList"
import { getOrdersAll } from "../../actions/order"


function Admin () {
    const dispatch = useDispatch()
    const products = useSelector(state=>{return state.products.products})
    const orders = useSelector(state=>{return state.order.orders})
    const [modeEditProduct, setModeEditProduct] = React.useState(false)
    const [currentProduct, setCurrentProduct] = React.useState({})
    let currency = useSelector((state) => { return state.app.currency })
    const statusDescription = useSelector(state=>{return state.app.statusDescription})

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
    function changeStatusHandler (currentStatus) {
        let statuses = []
        for (let status in statusDescription) {
            statuses.push(status)
        }
        
    }
    function getStatusHandler (currentStatus) {
        
        return currentStatus
    }

    React.useEffect(()=>{
        console.log(orders)
        dispatch(getOrdersAll())
    }, [])

    return (
        <div className="admin block">
            <div className="container">
                <h2 className="title admin__title">Админ-панель</h2>
                {modeEditProduct ? <EditProduct product={currentProduct} setModeAddProductHundler={setModeAddProductHundler} /> : <AddProduct/>}
                <AdminProductList 
                    products={products} 
                    modeEditProduct={modeEditProduct} 
                    setModeEditProductHundler={setModeEditProductHundler} 
                    editProductHundler={editProductHundler} 
                    deleteProductHandler={deleteProductHandler}
                ></AdminProductList>
                {orders.length ? 
                    <AdminOrderList
                        orders={orders}
                        currency={currency}
                        statusDescription={statusDescription}
                        getStatusHandler={getStatusHandler}
                        changeStatusHandler={changeStatusHandler}
                    >
                    </AdminOrderList>: null
                }
            </div>
        </div>
    )
}

export default Admin