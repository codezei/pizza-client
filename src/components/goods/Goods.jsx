import "./Goods.scss"
import {API_URL} from "../../config"
import {Link} from "react-router-dom"

import React from 'react';


function Goods (props) {

    return (
        <section className="goods">
            <div className="goods__nav">
                <h2 className="goods__title">{props.title}</h2>
                <Link to={`/filter`}>Фильтр</Link>
            </div>
            <div className="goods__list row">
                {
                    props.goods.map(item=>{
                        return (
                            <div className="goods__item goods-item col-xl-3 col-md-3 col-2" key={`goods-${item._id}`}>
                                <img src={`${API_URL}/${item.imgPath}`} alt="" className="goods-item__img" />
                                <h3 className="goods-item__name">{item.name}</h3>
                                <p className="goods-item__composition">{item.composition.filter(item=>{return item.checked}).map(item=>{return item.name}).join(', ')}</p>
                                <div className="goods-item__nav">
                                    <Link to={`parametres/${item._id}`} className="goods-item__btn btn">Выбрать</Link>
                                    <div className="goods-item__price">от {item.price} ₽</div>
                                </div>

                                
                            </div>
                        )
                    })
                }

            </div>
        </section>
    )
}

export default Goods