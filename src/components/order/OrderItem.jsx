import { API_URL } from "../../config"
import { useSelector } from 'react-redux'

function OrderItem (props) {
    let currency = useSelector(state=>{return state.app.currency})
    return (
        <div className="order__item">
        <div className='order__item-info'>
            <img src={`${API_URL}/${props.orderItem.imgPath}`} alt="" className="order__item-img" />
            <div>
                <h4 className="order__item-title">
                    {props.orderItem.name}
                </h4>
                <div className="order__item-composition">
                    {`${props.orderItem.dough}, ${props.orderItem.size}`}

                </div>
            </div>

        </div>
        <div className='order__item-value'>
                <div className="order__item-count">
                {props.orderItem.count} шт.
                </div>
                <div className="order__item-price">
                {props.orderItem.price * props.orderItem.count} {currency}
                </div>
        </div>
    </div>
    )
}

export default OrderItem