import { useDispatch } from "react-redux"
import "./Login.scss"
import React from 'react'
import {login} from "../../actions/user"
import { Link } from 'react-router-dom'



function Login () {
    const dispatch = useDispatch()
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
    }
  
    return (
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
                <Link to="#registration" className="btn btn--inversion form__btn form__btn--registartion">Регистраиця</Link>
            </form>
        </div>
    )
}



export default Login
