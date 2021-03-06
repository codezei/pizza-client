import "./Goods.scss"
import {API_URL} from "../../config"
import {Link, useLocation} from "react-router-dom"
import {useSelector} from "react-redux"
import React from 'react';


function Goods (props) {

    const filter = useSelector(state=>{return state.products.filter})

    function checkConformityFilter (filter, composition) {
        let res = filter.every(filterItem=>{
            let findRes = composition.find(compositionItem=>{
                return compositionItem.checked && compositionItem.value === filterItem
            })
            return !!findRes
        })
        return res
    }

    let location = useLocation()
    return (
        <section className="goods">
            <div className="container">
                <div className="goods__nav">
                    <h2 className="goods__title">{props.title}</h2>
                    <Link to={`${location.pathname === "/" ? "" : location.pathname}/filter`}>Фильтр</Link>
                </div>
                <div className="goods__list">
                    {
                        props.goods.filter((item, index)=>{return index < props.count && (checkConformityFilter(filter, item.composition))}).map(item=>{
                            return (
                                <div className="goods__item goods-item" key={`goods-${item._id}`}>
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
                {!props?.showMoreBtn?.show || <Link to={props.showMoreBtn.path}>Посмотреть все</Link>}
            </div>

        </section>
    )
}

export default Goods