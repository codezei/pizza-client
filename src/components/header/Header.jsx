import "./Header.scss"
import {useDispatch, useSelector} from "react-redux"
import {userIcon} from "../../assets/icons/iconsSvg"
import {cartIcon} from "../../assets/icons/iconsSvg"
import {logOut} from "../../reducers/userReducer"
import {Link, NavLink} from "react-router-dom"

import React from 'react'
import logo from '../../assets/images/logo.svg'

function Header () {
    const dispatch = useDispatch()
    const isAuth = useSelector(state=>{return state.user.isAuth})
    const isAdmin = useSelector(state=>{return state.user.isAdmin})
    const currentUser = useSelector(state=>{return state.user.currentUser})
    const cartList = useSelector(state=>{return state.cart.cartList})
    let [cartSummary, setCartSummary] = React.useState(0)

    function logOutHundler () {
        dispatch(logOut())
    }
    function getUserName () {
        let user = currentUser.email.split('@')
        return user[0]
    }
    function getCartCummary () {
        if (cartList.length) {
            setCartSummary(
                cartList.reduce((previousValue, currentItem)=>{
                    return previousValue + currentItem.price * currentItem.count
                }, 0)
            )
        } else {
            setCartSummary(0)
        }
    
    }
    
    React.useEffect(()=>{
        getCartCummary ()
    }, [cartList])
    return (
         <header className="header">
                <div className="container">
                    <div className="row justify-content-between align-items-center header__row">
                        <div className="col-auto">
                            <Link to="/" className="header__logo logo">
                                <img src={logo} alt="" />
                            </Link> 
                        </div>
                        <div className="col-auto">
                            {
                                isAuth ? 
                                <div>
                                    <div className="mb15">Вы вошли как {getUserName()}</div>
                                    <button className="btn header__btn" onClick={logOutHundler}>Выйти</button>
                                    {
                                        isAdmin ? 
                                            <Link to="/admin" className="btn header__btn">Админка</Link> 
                                            : 
                                            <Link to="/account/setting" className="btn header__btn">Аккаунт</Link> 
                                    }
                                </div> 
                                : 
                                <Link to="#login" className="header__link">{userIcon}Войти в аккаунт</Link>
                            }
                        </div>
                    </div>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                            <nav className="menu">
                                <NavLink to="/" className="menu__link">Главная</NavLink>
                                <NavLink to="/pizza" className="menu__link">Пицца</NavLink>
                                <NavLink to="/order/checkout" className="menu__link">Заказ</NavLink>
                            </nav>
                        </div>
                        <div className="col-auto">
                            <Link to={`#cart`} className="btn header__btn">{cartIcon}{` ${cartSummary} ₴`} </Link>
                        </div>
                    </div>
                </div>
            </header>
    )
}

export default Header