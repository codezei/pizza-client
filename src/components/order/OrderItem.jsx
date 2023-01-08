import { API_URL } from "../../config"
import { useSelector } from 'react-redux'

function OrderItem (props) {
    let currency = useSelector(state=>{return state.app.currency})
    return (
        <div className="order-item">
            <div className='order-item__info'>
                <img src={`${API_URL}/${props.orderItem.imgPath}`} alt="" className="order-item__img" />
                <div>
                    <h4 className="order-item__title">
                        {props.orderItem.name}
                    </h4>
                    <div className="order-item__composition">
                        {`${props.orderItem.dough}, ${props.orderItem.size}`}

                    </div>
                </div>

            </div>
            <div className='order-item__value'>
                    <div className="order-item__count">
                    {props.orderItem.count} шт.
                    </div>
                    <div className="order-item__price">
                    {props.orderItem.price * props.orderItem.count} {currency}
                    </div>
            </div>
    </div>
    )
}

export default OrderItem