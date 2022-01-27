
import Login from "../login/Login"
import Registration from "../registration/Registration"
import React from 'react'
import {useSelector} from "react-redux"
import Goods from "../goods/Goods"
import {Outlet} from "react-router-dom"
import Header from "../header/Header"

function Home () {
    const showLoginPopup = useSelector((state)=>{return state.app.showLoginPopup})
    const showRegistrationPopup = useSelector((state)=>{return state.app.showRegistrationPopup})
    const products = useSelector(state=>{return state.products.products})

    return (
        <div>
            <Header></Header>
            <div className="container">
                <Goods title="Пицца" goods={products}></Goods>
            </div>
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