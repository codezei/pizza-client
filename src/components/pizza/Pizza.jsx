
import Goods from "../goods/Goods"

import {useSelector} from "react-redux"

function Pizza () {
    
const products = useSelector(state=>{return state.products.products})
    return (
        <div className="pizza">
            <div className="container">
                <Goods title="Пицца" goods={products} pagination={true}></Goods>
            </div>

        </div>
    )
}


export default Pizza