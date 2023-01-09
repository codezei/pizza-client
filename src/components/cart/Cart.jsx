import "./Cart.scss"
import { useDispatch, useSelector } from "react-redux"
import { incrementCountProduct, decrementCountProduct, removeFromCart } from '../../reducers/cartReducer'
import { API_URL } from "../../config"
import { Link } from 'react-router-dom'
import React from 'react'

function Cart() {
    let dispatch = useDispatch()
    let cartList = useSelector((state) => { return state.cart.cartList })
    let currency = useSelector((state) => { return state.app.currency })
    let [total, setTotal] = React.useState(0)
    function decrementCountValueHandler(item) {
        if (item.count <= 1) {
            dispatch(removeFromCart(item))
        } else {
            dispatch(decrementCountProduct(item))
        }
    }
    function incrementCountValueHandler(item) {
        dispatch(incrementCountProduct(item))
    }
    function getTotalPrice() {
        if (cartList.length) {
            setTotal(cartList.reduce((previousValue, currentItem) => {
                return previousValue + currentItem.price * currentItem.count
            }, 0))
        }
    }

      
    React.useEffect(() => {
        getTotalPrice()
    }, [cartList])
    return (
        <div className="cart">
            {cartList.length ?
                cartList.map((item, index) => {
                    return (
                        <div className="cart__item" key={`cart-item-${index}`}>
                            <img src={`${API_URL}/${item.imgPath}`} alt="" className="cart__img" />
                            <div>
                                <h3 className="cart__name">{item.name}</h3>
                                <div className="cart__composition">
                                    {`${item.dough.name} тесто, ${item.size.name}`}

                                    <div className="cart__composition--put">
                                        <b>Исключить: </b>
                                        {
                                            item.composition.filter((item) => {
                                                return !!item.put
                                            }).map(composition => {
                                                return composition.name
                                            }).join(', ') || 'пусто'
                                        }
                                    </div>

                                    <div className="cart__composition--add">
                                        <b>Добавить: </b>
                                        {
                                            item.compositionAdd.filter((item) => {
                                                return !!item.add
                                            }).map(composition => {
                                                return composition.name
                                            }).join(', ') || 'пусто'
                                        }
                                    </div>

                                </div>
                                <div className="cart__footer">
                                    <div className="cart__count">
                                        <button type="button" className="cart__count-btn cart__count-btn--decrement" onClick={() => { decrementCountValueHandler(item) }}>-</button>
                                        <div className="cart__count-value">{item.count}</div>
                                        <button type="button" className="cart__count-btn cart__count-btn--increment" onClick={() => { incrementCountValueHandler(item) }}>+</button>
                                    </div>
                                    <div className="cart__price">{item.price * item.count} {currency}</div>
                                </div>
                            </div>
                        </div>
                    )
                }) : 'Корзина пуста'}
            {cartList.length ? 
            <div className="cart__footer">
                <div className="cart__total">Итого: {total} {currency}</div>
                <Link to="/order/checkout" className="cart__btn btn">Оформить заказ</Link>
            </div> : ""}

        </div>
    )
}


export default Cart;