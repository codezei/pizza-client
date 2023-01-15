import "./Goods.scss"
import {API_URL} from "../../config"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import Pagination from "../pagination/Pagination"
import React from 'react';

function Goods ({goods, title, pagination, limit, children}) {
    const currency = useSelector(state=>{return state.app.currency})
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

    let products = goods.filter((item)=>{return (checkConformityFilter(filter, item.composition))}).map(item=>{
        return (
            <div className="col-12 col-sm-6 col-md-4 col-xl-3 goods__col" key={`goods-${item._id}`}>
                <div className="goods-item">
                    <img src={`${API_URL}/${item.imgPath}`} alt="" className="goods-item__img" />
                    <h3 className="goods-item__name">{item.name}</h3>
                    <p className="goods-item__composition">{item.composition.filter(item=>{return item.checked}).map(item=>{return item.name}).join(', ')}</p>
                    <div className="goods-item__nav">
                        <Link to={`parametres/${item._id}`} className="goods-item__btn btn">Выбрать</Link>
                        <div className="goods-item__price">от {item.price} {currency}</div>
                    </div>
                </div>
            </div>

        )
    }).filter((fgoof, findex)=>{
        return (limit ? findex < limit: true)
    })

    return (
        <section className="goods block">
            <div className="goods__nav">
                <h2 className="goods__title title">{title}</h2>
                <Link to="#filter" className="btn">Фильтр</Link>
            </div>
            <div className="row">
                {pagination ? <Pagination products={products} message='Товаров нет'></Pagination> : products}
                {children && <div className="col-12">
                    {children}
                </div>}
            </div>
        </section>
    )
}

export default Goods