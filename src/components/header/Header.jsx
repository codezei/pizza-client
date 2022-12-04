import "./Header.scss"
import {useDispatch, useSelector} from "react-redux"
import {changeLoginPopup} from "../../reducers/appReducer"
import {userIcon} from "../../assets/icons/iconsSvg"
import {cartIcon} from "../../assets/icons/iconsSvg"
import {logOut} from "../../reducers/userReducer"
import {Link} from "react-router-dom"
import React from 'react'

function Header () {
    const dispatch = useDispatch()
    const isAuth = useSelector(state=>{return state.user.isAuth})
    const currentUser = useSelector(state=>{return state.user.currentUser})
    const cartList = useSelector(state=>{return state.cart.cartList})
    // const [cartInfo, setCartInfo] = React.useState(false)
    let [cartSummary, setCartSummary] = React.useState(0)



    function changeLoginPopupHundler () {
        dispatch(changeLoginPopup())
    }
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
    // function showCartInfo () {
    //     setCartInfo(true)
    //     setTimeout(function() {
    //         setCartInfo(false)
    //     }, 5000)
    // }
    React.useEffect(()=>{
        getCartCummary ()
    }, [cartList])
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div className="header__top">
                        <div className="header__top-left">
                            {/* <div className="header__city">
                                <select name="city" id="">
                                    <option value="moscow">Москва</option>
                                    <option value="petersburg">Санкт-Петербург</option>
                                </select>
                            </div>
                            <button type="button" className="header__check-btn">Проверить адресс</button> */}
                            <p className="">Среднее врем доставки*: <b>00:24:19</b> </p>
                        </div>
                        <div className="header__top-right">
                            <p className="header__schedule">Время работы: с 11:00 до 23:00</p>
                            <div className="header__person">
                                {
                                    isAuth ? <div>
                                                <p>Вы вошли как {getUserName()}</p>
                                                <button className="btn header__btn" onClick={logOutHundler}>Выйти</button>
                                                <Link to="/admin" className="btn header__btn">Админ-панель</Link>
                                            </div> 
                                    : 
                                    <button type="button" onClick={changeLoginPopupHundler} className="header__link">{userIcon}Войти в аккаунт</button>
                                }
                            </div>

                            
                        </div>
                    </div>
                    <div className="header__bottom">
                        <Link to="/cart" className="btn header__btn">{cartIcon}{` ${cartSummary} ₴`} </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header