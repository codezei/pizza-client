
import Login from "../login/Login"
import Registration from "../registration/Registration"
import React from 'react'
import {useSelector} from "react-redux"
import Goods from "../goods/Goods"
import {Link, Outlet} from "react-router-dom"
// import Header from "../header/Header"

function Home () {
    const showLoginPopup = useSelector((state)=>{return state.app.showLoginPopup})
    const showRegistrationPopup = useSelector((state)=>{return state.app.showRegistrationPopup})
    const products = useSelector(state=>{return state.products.products})

    return (
        <div>
            <Goods title="Пицца" goods={products} count={8} showMoreBtn={{show: true, path:"/pizza"}}></Goods>
            {
                showLoginPopup ? <Login></Login> : null
            }
            {
                showRegistrationPopup ? <Registration></Registration> : null
            }
            <Outlet></Outlet>
        </div>
    )
}

export default Home