import "./Popup.scss"
import {closeIcon} from "../../assets/icons/iconsSvg"


function PopupSide (props) {
    function closePopupHandler (e) {
        e.stopPropagation()
        window.history.back()
    }
    return (
        <div className="popup" onClick={(e)=>{if(e.target === e.currentTarget) {closePopupHandler(e)}}}>
            <div className="popup__inner popup__inner--side">
                <div className="popup__header">
                    <h2 className="popup__title">{props.title}</h2>
                    <button type="button" onClick={closePopupHandler} className="popup__close popup__close--side">{closeIcon}</button>
                </div>
                <div className="popup__content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default PopupSide