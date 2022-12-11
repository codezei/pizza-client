
import Goods from "../goods/Goods"

import {useSelector} from "react-redux"
function Pizza () {
    
const products = useSelector(state=>{return state.products.products})
    return (
        <div>
            <Goods title="Пицца" goods={products} count={8}></Goods>
        </div>
    )
}


export default Pizza