import { useDispatch } from "react-redux"
import "./Login.scss"
import {changeLoginPopup} from "../../reducers/appReducer"



function Login () {
    const dispatch = useDispatch()
    function changeLoginPopupHundler () {
        dispatch(changeLoginPopup())
    }
    let closeIcon = <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" /><path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" /></svg>
  
    return (
        <div className="popup">
            <div className="popup__inner">
                <button type="button" onClick={changeLoginPopupHundler} className="popup__close">{closeIcon}</button>
                <form method="POST" className="popup__form form">
                    <h3 className="form__title">Вход в аккаунт</h3>
                    <p className="form__desc">Сможете быстро оформлять заказы, использовать бонусы</p>
                    <div className="form__row">
                        <label htmlFor="email" className="form__label">Ваш email</label>
                        <input type="text" name="email" id="email" className="form__input input" required />
                    </div>
                    <div className="form__row">
                        <label htmlFor="password" className="form__label">Ваш пароль</label>
                        <input type="password" name="password" id="password" className="form__input input" required />
                    </div>
                    <button className="btn form__btn">Войти</button>
                </form>
            </div>
        </div>
    )
}



export default Login
