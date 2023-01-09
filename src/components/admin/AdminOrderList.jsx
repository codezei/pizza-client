
import AdminOrderItem from './AdminOrderItem'

function AdminOrderList({orders, currency, statusDescription, getStatusHandler, changeStatusHandler}) {
    return ( 
        <div className="admin-order">
            <h3 className="admin-order__title">Список заказов</h3>
            <div className="admin-order__list">
                {
                    orders.length ? orders.map(order=>{
                        return (
                            <AdminOrderItem key={`${order._id}`} changeStatusHandler={changeStatusHandler} getStatusHandler={getStatusHandler} order={order} currency={currency} statusDescription={statusDescription}>

                            </AdminOrderItem>
                        )
                    }) : null
                }
            </div>
        </div>
     );
}

export default AdminOrderList;