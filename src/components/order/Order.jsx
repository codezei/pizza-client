import { useSelector, useDispatch } from 'react-redux'
// import { API_URL } from "../../config"
import './Order.scss'
import React from 'react'
import OrderItem from './OrderItem'
import { useNavigate } from "react-router-dom";
import { addOrder } from '../../actions/order'

function Order() {
    let cartList = useSelector(state => { return state.cart.cartList })
    let user = useSelector(state => { return state.user.currentUser })
    let currency = useSelector(state => { return state.app.currency })
    let currentOrder = useSelector(state => { return state.order.currentOrder })
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
                date: cartItem.imgPath,
                name: cartItem.name,
                dough: cartItem.dough.name,
                wight: cartItem.weight,
                count: cartItem.count
            }
        }), user: { ...user }
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
                date: cartItem.imgPath,
                name: cartItem.name,
                dough: cartItem.dough.name,
                wight: cartItem.weight,
                count: cartItem.count
            }
        })

        setOrder({ ...order, foods, user: { ...user } })
    }
    function changeUserDataHandler(e) {
        setOrder({
            ...order, user: { ...order.user, [e.target.name]: e.target.value }
        })
    }
    function addOrderHandler (e) {
        e.preventDefault()
        dispatch(addOrder(order))
    }

    React.useEffect(() => {
        createOrder()
    }, [cartList, user])

    React.useEffect(() => {
        if (currentOrder._id) {
            navigate(`/details/${currentOrder._id}`)
        }
    }, [currentOrder])


    return (
        <div className='order'>

            <div className="container">
                <h2 className="order__title">Ваш заказ</h2>
                <div className="order__list">
                    {
                        order.foods.map(orderItem => {
                            return <OrderItem orderItem={orderItem} key={orderItem.key}></OrderItem>
                        })
                    }

                </div>
                <form className="order__form" method='POST' onSubmit={addOrderHandler}>
                    <div className="order__block">
                        <h3 className="order__block-title">
                            О вас
                        </h3>
                        <div className="order__block-row">
                            <div className="order__block-col">
                                <label className="order__block-label" htmlFor='name'>
                                    Имя
                                </label>
                                <input type="text" className="order__block-input input" value={order.user.name || ''} id="name" name="name" onChange={changeUserDataHandler} required></input>
                            </div>
                            <div className="order__block-col">
                                <label className="order__block-label" htmlFor='phone'>
                                    Телефон
                                </label>
                                <input type="tel" className="order__block-input input" value={order.user.phone || ''} id="phone" name="phone" onChange={changeUserDataHandler} required></input>
                            </div>
                            <div className="order__block-col">
                                <label className="order__block-label" htmlFor='email'>
                                    Email
                                </label>
                                <input type="email" className="order__block-input input" value={order.user.email || ''} id="email" name="email" onChange={changeUserDataHandler} required></input>
                            </div>

                        </div>
                    </div>
                    <div className="order__block">
                        <h3 className="order__block-title">
                            Доставка
                        </h3>
                        <label className="order__block-label" htmlFor='adress'>
                            Адрес
                        </label>
                        <input type="text" className="order__block-input input" value={order.user.adress || ''} id="adress" name="adress" onChange={changeUserDataHandler} required></input>

                    </div>
                    <div className="order__block">
                        <h3 className="order__block-title">Комментарий</h3>
                        <textarea name="comment" id="comment" className='order__block-input input' value={order.user.comment || ''} cols="30" rows="10" onChange={changeUserDataHandler}></textarea>
                    </div>
                    <div className="order__footer">
                        <div className="order__total">
                            Итого: {order.foods.reduce((previousValue, currentItem) => {
                                return previousValue + currentItem.price * currentItem.count
                            }, 0)} {currency}
                        </div>
                        <button className="order__btn btn">Оформить заказ</button>
                    </div>
                </form>
            </div> 
        </div> 
    )
}


export default Order