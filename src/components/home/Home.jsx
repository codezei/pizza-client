import Header from "../header/Header"
import Login from "../login/Login"
import React from 'react'
import {useSelector} from "react-redux"



function Home () {
    const showLoginPopup = useSelector((state)=>{return state.app.showLoginPopup})

    return (
        <div>
            <Header></Header>
            <p>Home</p>
            {
                showLoginPopup ? <Login></Login> : null
            }
            
        </div>
    )
}

export default Home