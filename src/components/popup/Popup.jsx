import "./Popup.scss"
import {closeIcon} from "../../assets/icons/iconsSvg"
import { useLocation, useNavigate } from "react-router-dom"
import React from 'react';

function Popup ({isAuth, children}) {
    const location = useLocation()
    const navigate = useNavigate()
    function closePopupHandler (e) {
        e.stopPropagation()
        if (location.hash) {
            navigate(location.pathname)
        } else {
            window.history.back()
        }
    }
    React.useEffect(()=>{
        if ((location.hash === '#login' || location.hash === '#registration') && isAuth) {
            window.history.back()
        }
    }, [isAuth])
    return (
        <div className="popup" onClick={(e)=>{if(e.target === e.currentTarget) {closePopupHandler(e)}}}>
            <div className="popup__inner">
                <button type="button" onClick={closePopupHandler} className="popup__close">{closeIcon}</button>
                {children}
            </div>
        </div>
    )
}

export default Popup