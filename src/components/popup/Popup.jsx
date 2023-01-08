import "./Popup.scss"
import {closeIcon} from "../../assets/icons/iconsSvg"


function Popup (props) {
    function closePopupHandler (e) {
        e.stopPropagation()
        window.history.back()
    }
    return (
        <div className="popup" onClick={(e)=>{if(e.target === e.currentTarget) {closePopupHandler(e)}}}>
            <div className="popup__inner">
                <button type="button" onClick={closePopupHandler} className="popup__close">{closeIcon}</button>
                {props.children}
            </div>
        </div>
    )
}

export default Popup