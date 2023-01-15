
import AdminOrderItem from './AdminOrderItem'
import Pagination from "../pagination/Pagination"
import React from 'react';
import { statusIcons } from '../../assets/icons/iconsSvg';


function AdminOrderList({orders, currency, statusDescription, getStatusHandler, changeStatusHandler}) {
    const [orderFilter, setOrderFilter] = React.useState('')
    const [statusOrderFilter, setStatusOrderFilter] = React.useState('')
    function setOrderFilterHandler (e) {
        setOrderFilter(e.target.value)
    }
    function changeStatusOrderFilterHandler (status) {
        setStatusOrderFilter(status)
    }
    let ordersList = orders.length ? orders.filter(forder=>{
        return (!orderFilter || (''+forder.data.number).match(new RegExp(orderFilter))) && (!statusOrderFilter || statusOrderFilter === forder.data.status)
    }).map(order=>{
        return (
            <AdminOrderItem key={`${order._id}`} changeStatusHandler={changeStatusHandler} getStatusHandler={getStatusHandler} order={order} currency={currency} statusDescription={statusDescription}></AdminOrderItem>
        )
    }) : null
    return ( 
        <div className="admin-order">
            <div className="admin-order__nav">
                <h3 className="admin-order__title">Список заказов</h3>
                <div className="admin-order__filter">
                    <div className="admin-order__filter-status">
                        {statusDescription.map(item=>{return (
                            <button 
                                key={`filter-status-${item.value}`} 
                                className={`admin-order__item-btn btn btn--inversion ${statusOrderFilter === item.value ? 'active' : ""}`} 
                                onClick={()=>{changeStatusOrderFilterHandler(item.value)}} 
                                title={item.nominative}
                            >
                                {statusIcons[item.value]}
                                </button>
                        )})}
                    </div>
                    <input type="text" placeholder='Введите номер заказа' className="input admin-order__filter-number" value={orderFilter} onChange={setOrderFilterHandler} />

                </div>

            </div>
            
            <div className="admin-order__list">
                {
                    <Pagination products={ordersList} message='Заказов нет'></Pagination>
                }
            </div>
        </div>
     );
}

export default AdminOrderList;