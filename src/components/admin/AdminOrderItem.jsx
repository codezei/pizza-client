
import OrderDetailsItem from '../order/OrderDetailsItem'

function AdminOrderItem({ changeStatusHandler, getStatusHandler, order, currency, statusDescription}) {
    return ( 
        <div className="admin-order__item">
            <div className="admin-order__item-details">
                <OrderDetailsItem
                    number={order.data.number} 
                    date={order.data.date.match(/[0-9]{4}.[0-9]{2}.[0-9]{2}/)} 
                    status={order.data.status} 
                    foods={order.foods} 
                    adress={order.user.adress} 
                    total={order.data.total}
                    currency={currency}
                    statusDescription={statusDescription}
                ></OrderDetailsItem>
            </div>
            <div className="admin-order__item-nav">
                <button className="btn admin-order__item-btn" onClick={()=>{changeStatusHandler(order.data.status)}}>{getStatusHandler(order.data.status)}</button>
                <button className="btn btn--cancel admin-order__item-btn">Отмена</button>
            </div>
            

        </div>
     );
}

export default AdminOrderItem;