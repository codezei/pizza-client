import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../actions/order';
import React from 'react';
import AcceptedImg from '../../assets/images/accepted.svg'


function OrderAccepted() {
    const currentOrder = useSelector(state=>{return state.order.currentOrder})
    const isAuth = useSelector(state=>{return state.user.isAuth})
    const dispatch = useDispatch()
    let { id } = useParams();

    React.useEffect(()=>{
        dispatch(getOrder(id))
    }, [])

    return ( 
        <>
        {
            currentOrder?._id && <div className="order-accepted block">
            <img src={AcceptedImg} alt="" className="order-acceted__img" />
            <h2 className="order-accepted__order">
                Ваш заказ № {currentOrder.data ? currentOrder.data.number : ''} принят
            </h2>
            <p className="order-accepted__text">
                Спасибо за заказ! <br></br>
                Примерное время доставки 45 минут. Статус отследить можно нажав на кнопку ниже
            </p>
            {isAuth ? <Link to={`/order/details/${id}`} className='btn'>Отследить заказ</Link> : <Link to={`/accont/history`} className='btn'>Отследить заказ</Link>}

        
    </div>
        }
        </>
         );
}

export default OrderAccepted;