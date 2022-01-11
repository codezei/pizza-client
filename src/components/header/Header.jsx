import "./Header.scss"
import {useDispatch} from "react-redux"
import {changeLoginPopup} from "../../reducers/appReducer"

function Header () {
    const dispatch = useDispatch()
    function changeLoginPopupHundler () {
        dispatch(changeLoginPopup())
    }
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div className="header__top">
                        <button type="button" onClick={changeLoginPopupHundler}>Войти в аккаунт</button>
                    </div>
                    <div className="header__bottom">
                        
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header