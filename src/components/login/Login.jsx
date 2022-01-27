import { useDispatch, useSelector } from "react-redux"
import "./Login.scss"
import {changeLoginPopup, changeRegistrationPopup} from "../../reducers/appReducer"
import {closeIcon} from "../../assets/icons/iconsSvg"
import React from 'react'
import {login} from "../../actions/user"




function Login () {
    const dispatch = useDispatch()
    function changeLoginPopupHundler () {
        dispatch(changeLoginPopup())
    }
    function changeRegistrationPopupHundler () {
        dispatch(changeRegistrationPopup())
    }

    let [formData, setFormData] = React.useState({
        email: "",
        password: ""
    })

    function setFormDataHundler (target) {
        setFormData({...formData, [target.name]: target.value})
    }
    function sendFormHandler (e) {
        e.preventDefault()
        dispatch(login(formData['email'], formData['password']))

        // if (isAuth) {
        //     setFormData({
        //         email: "",
        //         password: ""
        //     })

        // }


    }
  
    return (
        <div className="popup">
            <div className="popup__inner">
                <button type="button" onClick={changeLoginPopupHundler} className="popup__close">{closeIcon}</button>
                <div className="login">
                    <form method="POST" className="login__form form" onSubmit={sendFormHandler}>
                        <h3 className="form__title">Вход в аккаунт</h3>
                        <p className="form__desc">Сможете быстро оформлять заказы, использовать бонусы</p>
                        <div className="form__row">
                            <label htmlFor="email" className="form__label">Ваш email</label>
                            <input type="text" name="email" id="email" className="form__input input" required onChange={(e)=>{setFormDataHundler(e.target)}} value={formData['email']}  />
                        </div>
                        <div className="form__row">
                            <label htmlFor="password" className="form__label">Ваш пароль</label>
                            <input type="password" name="password" id="password" className="form__input input" required onChange={(e)=>{setFormDataHundler(e.target)}} value={formData['password']} />
                        </div>
                        <button type="submit" className="btn form__btn form__btn--login">Войти</button>
                        <button type="button" className="btn btn--inversion form__btn form__btn--registartion" onClick={changeRegistrationPopupHundler}>Регистраиця</button>
                    </form>
                </div>

            </div>
        </div>
    )
}



export default Login
