
import OrderDetailsItem from '../order/OrderDetailsItem'
import { statusIcons } from '../../assets/icons/iconsSvg';

function AdminOrderItem({ changeStatusHandler, order, currency, statusDescription}) {
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
                {statusDescription.map(item=>{return (
                    <button key={`${order._id}-${item.value}`} className={`admin-order__item-btn btn btn--inversion ${order.data.status === item.value ? 'active' : ""}`} onClick={()=>{changeStatusHandler(item.value, order._id)}} title={item.nominative}>{statusIcons[item.value]}</button>
                )})}
            </div>
            

        </div>
     );
}

export default AdminOrderItem;