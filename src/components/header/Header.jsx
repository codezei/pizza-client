import "./Header.scss"
import {useDispatch, useSelector} from "react-redux"
import {userIcon} from "../../assets/icons/iconsSvg"
import {cartIcon} from "../../assets/icons/iconsSvg"
import {logOut} from "../../reducers/userReducer"
import {Link} from "react-router-dom"

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
                <div className="header__inner">
                    <div className="header__top">
                        <div className="header__top-left">
                            <p className="">Среднее врем доставки*: <b>00:24:19</b> </p>
                        </div>
                        <div className="header__top-right">
                            <p className="header__schedule">Время работы: с 11:00 до 23:00</p>
                            <div className="header__person">
                                {
                                    isAuth ? 
                                    <div>
                                        <p>Вы вошли как {getUserName()}</p>
                                        <button className="btn header__btn" onClick={logOutHundler}>Выйти</button>
                                        {
                                            isAdmin ? 
                                                <Link to="/admin" className="btn header__btn">Админ-панель</Link> 
                                                : 
                                                <Link to="/account/setting" className="btn header__btn">Аккаунт</Link> 
                                        }
                                    </div> 
                                    : 
                                    <Link to="#login" className="header__link">{userIcon}Войти в аккаунт</Link>
                                }
                            </div>

                            
                        </div>
                    </div>
                    <div className="header__bottom">
                    <Link to="/" className="header__logo logo">
                        <img src={logo} alt="" />
                    </Link> 
                        <Link to={`#cart`} className="btn header__btn">{cartIcon}{` ${cartSummary} ₴`} </Link>
                    </div>
                </div>
            </div>
            
        </header>
    )
}

export default Header