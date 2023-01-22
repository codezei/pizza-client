import "./Goods.scss"
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Pagination from "../pagination/Pagination"
import React from 'react';
import { deleteFilter } from "../../reducers/productsReducer"

function Goods ({goods, title, pagination, limit, children}) {
    const currency = useSelector(state=>{return state.app.currency})
    const filter = useSelector(state=>{return state.products.filter})
    const dispatch = useDispatch()
    const location = useLocation()
    function checkConformityFilter (filter, composition) {
        let res = filter.every(filterItem=>{
            let findRes = composition.find(compositionItem=>{
                return compositionItem.checked && compositionItem.value === filterItem
            })
            return !!findRes
        })
        return res
    }
    React.useEffect(()=>{
        dispatch(deleteFilter())
    }, [])

    let products = goods.filter((item)=>{return (checkConformityFilter(filter, item.composition))}).map(item=>{
        return (
            <div className="col-12 col-sm-6 col-md-4 col-xl-3 goods__col" key={`goods-${item._id}`}>
                <div className="goods-item">
                    <div className="goods-item__top">
                        <img src={`${item.imgPath}`} alt="" className="goods-item__img" />
                        <h3 className="goods-item__name">{item.name}</h3>
                        <p className="goods-item__composition">{item.composition.filter(item=>{return item.checked}).map(item=>{return item.name}).join(', ')}</p>
                    </div>
                    <div className="goods-item__bottom">
                        <div className="goods-item__nav">
                            <Link to={`${location.pathname}${location.pathname === '/' ? '': '/'}parametres/${item._id}`} className="goods-item__btn btn">Выбрать</Link>
                            <div className="goods-item__price">от {item.price} {currency}</div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }).filter((fgoof, findex)=>{
        return (limit ? findex < limit: true)
    })

    return (
                <section className="goods block">
                    { products.length ? 
                        <>
                            <div className="goods__nav">
                                <h2 className="goods__title title">{title}</h2>
                                <Link to="#filter" className="btn">Фильтр{filter.length ? `(${filter.length})`: null}</Link>
                            </div>
                            <div className="row">
                                {pagination ? <Pagination products={products}></Pagination> : products}
                                {children && <div className="col-12">
                                    {children}
                                </div>}
                            </div>
                        </> : <h3 className="tcenter"><b>Товаров нет</b></h3>
                    }
                </section>
    )
}

export default Goods