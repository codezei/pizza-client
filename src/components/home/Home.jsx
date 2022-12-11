

import React from 'react'
import {useSelector} from "react-redux"
import Goods from "../goods/Goods"
import {Link, Outlet} from "react-router-dom"
// import Header from "../header/Header"

function Home () {
    const products = useSelector(state=>{return state.products.products})

    return (
        <div>
            <Goods title="Пицца" goods={products} count={8}></Goods>
        </div>
    )
}

export default Home