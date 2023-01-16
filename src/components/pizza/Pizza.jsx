
import Goods from "../goods/Goods"

import {useSelector} from "react-redux"
import { Outlet } from "react-router"

function Pizza () {
    
const products = useSelector(state=>{return state.products.products})
    return (
        <div className="pizza">
            <div className="container">
                <Goods title="Пицца" goods={products} pagination={true}></Goods>
            </div>
            <Outlet></Outlet>

        </div>
    )
}


export default Pizza