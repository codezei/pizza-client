import {API_URL} from "../../config"
import { useState } from "react"
import './Details.scss'

function OrderDetailsItem({number, date, status, statusDescription, foods, adress, total, currency}) {
    
    const [moreDetails, setMoreDetails] = useState(false)

    function showMoreDetailsHandler () {
        setMoreDetails(prev => {return !prev})
    }
    return ( 
    <div className="details">
        <div className="details__top">
            <div className="details__col details__col--indicator">
                <div className="details__indicator" style={{backgroundColor: statusDescription[status].color}}>

                </div>
                <div className="details__name">
                    Заказ
                </div>
                <div className="details__value">
                    №{number} <span className="details__value-date">{date}</span>
                </div>
            </div>
            <div className="details__col">
                <div className="details__name">
                    Сумма заказа
                </div>
                <div className="details__value">
                    {total}
                </div>
            </div>
            <div className="details__col">
                <div className="details__name">
                    Статус
                </div>
                <div className="details__value">
                    {statusDescription[status].name}
                </div>
            </div>
            <div className="details__col">
                <button type="button" className={`details__btn ${moreDetails && 'active'}`} onClick={showMoreDetailsHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
            </div>
        </div>
        <div className="details__medium">
            <div className="details__adress">{adress}</div>
            <div className="details__products">
                {
                    foods.map(product=>{
                        return (
                            <img className="details__products-img" src={`${API_URL}/${product.imgPath}`} alt="" key={product.imgPath}></img>
                        )
                    })
                }
            </div>
        </div>
        {moreDetails && <div className="details__bottom">
            {
                foods.map(product=>{
                    return (
                        <div className="details__product" key={product.key}>
                            <div className="details__product-row">
                                <img className="details__product-img" src={`${API_URL}/${product.imgPath}`} alt=""></img>
                                <div className="details__product-name">{product.name}</div>
                            </div>

                            <div className="details__product-composition">
                                {`${product.dough} тесто, ${product.size}`}

                                <div className="details__product-composition--put">
                                    <b>Исключить: </b>
                                    {
                                        product.composition.filter((item) => {
                                            return !!item.put
                                        }).map(composition => {
                                            return composition
                                        }).join(', ') || 'пусто'
                                    }
                                </div>

                                <div className="details__product-composition--add">
                                    <b>Добавить: </b>
                                    {
                                        product.compositionAdd.filter((item) => {
                                            return !!item.add
                                        }).map(composition => {
                                            return composition
                                        }).join(', ') || 'пусто'
                                    }
                                </div>

                            </div>
                            <div className="details__product-count">
                                {product.count} шт.
                            </div>
                            <div className="details__product-total">
                                {product.count * product.price} {currency}
                            </div>
                        </div>
                    )
                })
            }
            
        </div>}
    </div> );
}

export default OrderDetailsItem;