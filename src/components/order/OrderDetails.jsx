import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../actions/order';

import OrderDetailsItem from './OrderDetailsItem'
import React from 'react';


function OrderDetails() {
    const currentOrder = useSelector(state=>{return state.order.currentOrder})
    let currency = useSelector((state) => { return state.app.currency })
    const dispatch = useDispatch()
    let { id } = useParams();
    const statusDescription = useSelector(state=>{return state.app.statusDescription})

    React.useEffect(()=>{

        dispatch(getOrder(id))
    }, [])

    return ( 
        <div className="order-details block">
            <h2 className="order-details__title title">Ваш заказ</h2>
            {currentOrder?._id 
            && 
            <OrderDetailsItem 
                number={currentOrder.data.number} 
                date={currentOrder.data.date.match(/[0-9]{4}.[0-9]{2}.[0-9]{2}/)} 
                status={currentOrder.data.status} foods={currentOrder.foods} 
                adress={currentOrder.user.adress} total={currentOrder.data.total}
                currency={currency}
                statusDescription={statusDescription}
            ></OrderDetailsItem>}
        </div>
    );
}

export default OrderDetails;