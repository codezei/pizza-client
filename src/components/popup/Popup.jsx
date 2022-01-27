import "./Popup.scss"
import {useNavigate, useLocation} from "react-router-dom"
import {closeIcon} from "../../assets/icons/iconsSvg"


function Popup (props) {
    let Component = props.component
    const navigate = useNavigate()
    // const location = useLocation()
    function goBackHundler () {
        navigate('/')
    }
    return (
        <div className="popup">
            <div className="popup__inner">
            <button type="button" onClick={goBackHundler} className="popup__close">{closeIcon}</button>
                <Component></Component>
            </div>
        </div>
    )
}

export default Popup