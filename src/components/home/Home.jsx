import Header from "../header/Header"
import Login from "../login/Login"
import Registration from "../registration/Registration"
import React from 'react'
import {useSelector} from "react-redux"



function Home () {
    const showLoginPopup = useSelector((state)=>{return state.app.showLoginPopup})
    const showRegistrationPopup = useSelector((state)=>{return state.app.showRegistrationPopup})

    return (
        <div>
            <Header></Header>
            <p>Home</p>
            {
                showLoginPopup ? <Login></Login> : null
            }
                        {
                showRegistrationPopup ? <Registration></Registration> : null
            }
            
        </div>
    )
}

export default Home