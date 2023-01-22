
import { useSelector } from 'react-redux'

function OrderItem (props) {
    let currency = useSelector(state=>{return state.app.currency})
    return (
        <div className="order-item">
            <div className="row align-items-center justify-content-between w100">
                <div className="col-md-8 order-item__col">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-4 col-3">
                            <img src={`${props.orderItem.imgPath}`} alt="" className="order-item__img" />
                        </div>
                        <div className="col-md-8 col-9">
                            <h4 className="order-item__title">
                                {props.orderItem.name}
                            </h4>
                            <div className="details__product-composition">
                                {`${props.orderItem.dough} тесто, ${props.orderItem.size}`}

                                <div className="details__product-composition--put">
                                    <b>Исключить: </b>
                                    {
                                        props.orderItem.composition.filter((item) => {
                                            return !!item.put
                                        }).map(composition => {
                                            return composition
                                        }).join(', ') || 'пусто'
                                    }
                                </div>

                                <div className="details__product-composition--add">
                                    <b>Добавить: </b>
                                    {
                                        props.orderItem.compositionAdd.filter((item) => {
                                            return !!item.add
                                        }).map(composition => {
                                            return composition
                                        }).join(', ') || 'пусто'
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 order-item__col">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-auto col-3 text-center">
                            <div className="order-item__count">
                                {props.orderItem.count} шт.
                            </div>       
                        </div>
                        <div className="col-auto">
                            <div className="order-item__price">
                                {props.orderItem.price * props.orderItem.count} {currency}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default OrderItem