import { useDispatch } from "react-redux"
import {changeRegistrationPopup} from "../../reducers/appReducer"
import {closeIcon} from "../../assets/icons/iconsSvg"
import React from 'react'
import {registration} from "../../actions/user"
import "./Registration.scss"



function Registration () {
    const dispatch = useDispatch()
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
        registration(formData['email'], formData['password'])
        setFormData({
            email: "",
            password: ""
        })
    }
  
    return (
        <div className="popup">
            <div className="popup__inner">
                <button type="button" onClick={changeRegistrationPopupHundler} className="popup__close">{closeIcon}</button>
                <div className="registration">
                <form method="POST" className="registration__form form" onSubmit={(e)=>{sendFormHandler(e)}}>
                    <h3 className="form__title">Регистрация аккаунтa</h3>
                    <p className="form__desc">Сможете быстро оформлять заказы, использовать бонусы</p>
                    <div className="form__row">
                        <label htmlFor="email" className="form__label">Ваш email</label>
                        <input type="email" name="email" id="email" className="form__input input" required onChange={(e)=>{setFormDataHundler(e.target)}} value={formData['email']} />
                    </div>
                    <div className="form__row">
                        <label htmlFor="password" className="form__label">Ваш пароль</label>
                        <input type="password" name="password" id="password" className="form__input input" required  onChange={(e)=>{setFormDataHundler(e.target)}} value={formData['password']} />
                    </div>
                    <button className="btn form__btn" type="submit">Регистрация</button>
                </form>
                </div>
            </div>
        </div>
    )
}



export default Registration
