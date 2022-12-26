import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../actions/order';
import React from 'react';


function OrderDetails() {
    const currentOrder = useSelector(state=>{return state.order.currentOrder})
    const dispatch = useDispatch()
    let { id } = useParams();

    React.useEffect(()=>{
        dispatch(getOrder(id))
    }, [])

    return ( 
    <div className="details">
        <div className="container">
            <h2 className="details__order">
                Ваш заказ № {currentOrder.data ? currentOrder.data.number : ''} принят
            </h2>
            <p className="details__text">
                Спасибо за заказ! <br></br>
                Примерное время доставки 45 минут. Статус отследить можно нажав на кнопку ниже
            </p>
            <Link to="/trace">Отследить заказ</Link>
            
        </div>
        
    </div> );
}

export default OrderDetails;