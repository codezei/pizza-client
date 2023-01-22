import { useSelector, useDispatch } from 'react-redux'
import './Order.scss'
import React from 'react'
import OrderItem from './OrderItem'
import { useNavigate } from "react-router-dom";
import { addOrder } from '../../actions/order'

function OrderCheckout() {
    let cartList = useSelector(state => { return state.cart.cartList })
    let user = useSelector(state => { return state.user.currentUser })
    let currency = useSelector(state => { return state.app.currency })
    const navigate = useNavigate();
    const dispatch = useDispatch()

    let [order, setOrder] = React.useState({
        foods: cartList.map(cartItem => {
            return {
                composition: cartItem.composition.filter(compositionItem => {
                    return compositionItem.checked
                }).map(compositionItem => {
                    return compositionItem.name
                }),
                compositionPut: cartItem.composition.filter(compositionItem => {
                    return compositionItem.put
                }).map(compositionItem => {
                    return compositionItem.name
                }),
                compositionAdd: cartItem.compositionAdd.filter(compositionItem => {
                    return compositionItem.add
                }).map(compositionItem => {
                    return compositionItem.name
                }),
                price: cartItem.price,
                _id: cartItem._id,
                key: cartItem.key,
                size: cartItem.size.name,
                imgPath: cartItem.imgPath,
                name: cartItem.name,
                dough: cartItem.dough.name,
                wight: cartItem.weight,
                count: cartItem.count
            }
        }), user: { ...user }, total: cartList.reduce((previousValue, currentItem) => {
            return previousValue + currentItem.price * currentItem.count
        }, 0)
    })

    function createOrder() {
        let foods = cartList.map(cartItem => {
            return {
                composition: cartItem.composition.filter(compositionItem => {
                    return compositionItem.checked
                }).map(compositionItem => {
                    return compositionItem.name
                }),
                compositionPut: cartItem.composition.filter(compositionItem => {
                    return compositionItem.put
                }).map(compositionItem => {
                    return compositionItem.name
                }),
                compositionAdd: cartItem.compositionAdd.filter(compositionItem => {
                    return compositionItem.add
                }).map(compositionItem => {
                    return compositionItem.name
                }),
                price: cartItem.price,
                _id: cartItem._id,
                key: cartItem.key,
                size: cartItem.size.name,
                imgPath: cartItem.imgPath,
                name: cartItem.name,
                dough: cartItem.dough.name,
                wight: cartItem.weight,
                count: cartItem.count
            }
        })

        setOrder({ ...order, foods, user: { ...user }, total: cartList.reduce((previousValue, currentItem) => {
            return previousValue + currentItem.price * currentItem.count
        }, 0) })
    }
    function changeUserDataHandler(e) {
        setOrder({
            ...order, user: { ...order.user, [e.target.name]: e.target.value }
        })
    }
    function addOrderHandler (e) {
        e.preventDefault()
        dispatch(addOrder(order, redirectHandler))
    }
    function redirectHandler (url) {
        navigate(`/order/accepted/${url}`)
    }

    React.useEffect(() => {
        createOrder()
    }, [cartList, user])

    return ( 
        <>
            {order.foods.length ? 
                    <div className="order-checkout">
                    <h2 className="order-checkout__title title">Ваш заказ</h2>
                        <div className="order-checkout__list">
                            {
                                order.foods.map(orderItem => {
                                    return <OrderItem orderItem={orderItem} key={orderItem.key}></OrderItem>
                                })
                            }
        
                        </div>
                        <form className="order-checkout__form" method='POST' onSubmit={addOrderHandler}>
                            <div className="order-checkout__block">
                                <h3 className="order-checkout__block-title">
                                    О вас
                                </h3>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-4 order-checkout__block-col">
                                        <label className="order-checkout__block-label" htmlFor='name'>
                                            Имя
                                        </label>
                                        <input type="text" className="order-checkout__block-input input" value={order.user.name || ''} id="name" name="name" onChange={changeUserDataHandler} required></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 order-checkout__block-col">
                                        <label className="order-checkout__block-label" htmlFor='phone'>
                                            Телефон
                                        </label>
                                        <input type="tel" className="order-checkout__block-input input" value={order.user.phone || ''} id="phone" name="phone" onChange={changeUserDataHandler} required></input>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 order-checkout__block-col">
                                        <label className="order-checkout__block-label" htmlFor='email'>
                                            Email
                                        </label>
                                        <input type="email" className="order-checkout__block-input input" value={order.user.email || ''} id="email" name="email" onChange={changeUserDataHandler} required></input>
                                    </div>
        
                                </div>
                            </div>
                            <div className="order-checkout__block">
                                <h3 className="order-checkout__block-title">
                                    Доставка
                                </h3>
                                <label className="order-checkout__block-label" htmlFor='adress'>
                                    Адрес
                                </label>
                                <input type="text" className="order-checkout__block-input input" value={order.user.adress || ''} id="adress" name="adress" onChange={changeUserDataHandler} required></input>
        
                            </div>
                            <div className="order-checkout__block">
                                <h3 className="order-checkout__block-title">Комментарий</h3>
                                <textarea name="comment" id="comment" className='order-checkout__block-input input' value={order.user.comment || ''} cols="30" rows="10" onChange={changeUserDataHandler}></textarea>
                            </div>
                            <div className="order-checkout__footer">
                                <div className="order-checkout__total">
                                    Итого: {order.total} {currency}
                                </div>
                                <button className="order-checkout__btn btn">Оформить заказ</button>
                            </div>
                        </form>
                </div> : "Добавьте товар в корзину"    
        }
        </>

     );
}

export default OrderCheckout;