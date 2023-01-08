
import { useSelector } from 'react-redux'
import OrderDetailsItem from '../order/OrderDetailsItem'
import { getOrders } from '../../actions/order'
import React from 'react';
import { useDispatch } from 'react-redux';


function History () {
    let orders = useSelector(state=>{return state.order.orders})
    const dispatch = useDispatch()
    const statusDescription = useSelector(state=>{return state.app.statusDescription})
    let currency = useSelector((state) => { return state.app.currency })
    React.useEffect(()=>{
        dispatch(getOrders())
    }, [])
    return (
        <div className="history">
            { orders.length ? orders.map(order=>{
                return (
                    <OrderDetailsItem 
                        number={order.data.number} 
                        date={order.data.date.match(/[0-9]{4}.[0-9]{2}.[0-9]{2}/)} 
                        status={order.data.status} foods={order.foods} 
                        adress={order.user.adress} total={order.data.total}
                        currency={currency}
                        statusDescription={statusDescription}
                        key={order._id}
                    ></OrderDetailsItem>
                )
            }): 'Вы еще ничего не заказывали'}
        </div>
    )
}

export default History