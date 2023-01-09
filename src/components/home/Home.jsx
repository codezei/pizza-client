

import React from 'react'
import {useSelector} from "react-redux"
import Goods from "../goods/Goods"
import {Outlet} from "react-router-dom"

function Home () {
    const products = useSelector(state=>{return state.products.products})
    return (
        <div className="home">
            <div className="container">
                <Goods title="Пицца" goods={products}></Goods>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default Home