
import Goods from "../goods/Goods"
import {Outlet} from "react-router-dom"

import {useSelector} from "react-redux"
function Pizza () {
    
const products = useSelector(state=>{return state.products.products})
    return (
        <div>
            <Goods title="Пицца" goods={products} count={8}></Goods>
            <Outlet></Outlet>
        </div>
    )
}


export default Pizza