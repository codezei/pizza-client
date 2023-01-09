import Cart from '../cart/Cart'
import PopupSide from "../popup/PopupSide"
import { useLocation } from "react-router-dom"
import Login from '../login/Login';
import Registration from '../registration/Registration';
import Popup from './Popup';



function PopupsHash({isAuth}) {
    let location = useLocation()


    return ( 
        <>
            {location.hash === "#cart" ? <PopupSide title="Ваш заказ" children={<Cart></Cart>} /> : null }
            {location.hash === "#registration" ? <Popup isAuth={isAuth} children={<Registration></Registration>} />: null }
            {location.hash === "#login"  ? <Popup isAuth={isAuth} children={<Login></Login>} />: null }
        </>
     );
}

export default PopupsHash;