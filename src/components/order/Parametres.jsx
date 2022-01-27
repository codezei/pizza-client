import {useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import React from 'react';
import Loader from "../loader/Loader"
import {compositionIcons} from "../../assets/icons/iconsSvg"
import "./Parametres.scss"
import {API_URL} from "../../config"
import {useNavigate, Link} from "react-router-dom"
import {closeIcon} from "../../assets/icons/iconsSvg"

function Parametres () {
    let {id} = useParams()
    const product = useSelector(state=>{return state.products.products}).filter(item=>{return item._id === id})[0]
    const currency =  useSelector(state=>{return state.app.currency})
    function setProductDataSizeHundler (target) {
        setProductData({...productData, size: target})
    }

    function setProductDataDoughHundler (target) {
        setProductData({...productData, dough: target})
    }
    function changeCompositionHundler (product) {
        setProductData({...productData, composition: productData.composition.map(item=>{
            if (product.value === item.value) {
                return {...item, put: !item.put}
            } else {
                return item
            }
            
        })})
    }
    function changeCompositionAddHundler (product) {
        setProductData({...productData, price: product.add ? productData.price - product.price: productData.price + product.price,  compositionAdd: productData.compositionAdd.map(item=>{
            if (product.value === item.value) {
                return {...item, add: !item.add}
            } else {
                return item
            }
            
        })})
    }


    const productSize = [
        {   
            id: "size-20",
            name: "20 см",
            value: 20
        },
        {
            id: "size-28",
            name: "28 см",
            value: 28
        },
        {
            id: "size-33",
            name: "33 см",
            value: 33
        }
    ]
    const productDough = [
        {
            id: "dough-traditional", 
            name: "Традиционное",
            value: "traditional"
        },
        {
            id: "dough-thin", 
            name: "Тонкое",
            value: "thin"
        }
    ]

    const [productData, setProductData] = React.useState({
        ...product, size: productSize[0], dough: productDough[0]
    })

    

    const navigate = useNavigate()
    function goBackHundler () {
        navigate('/')
    }

    React.useEffect(()=>{
        
        setProductData({
            ...productData, 
            ...product
        })



    }, [product])

    return (

                <div className="popup">
                    <div className="popup__inner parametres">
                        <button type="button" onClick={goBackHundler} className="popup__close">{closeIcon}</button>
                        {
                            !productData?.composition ? <Loader></Loader> : 
                            <div className="parametres__inner">
                                <img src={`${API_URL}/${product.imgPath}`} alt="" className="parametres__img" />
                                <div className="parametres__data">
                                    <h3>{product.name}</h3>
                                    <div className="parametres__composition parametres-composition">
                                        <div className="parametres-composition__list">
                                            {
                                            productData.composition.filter(item=>{return item.checked}).map((item, index)=>{
                                                    return (
                                                        <div className={`parametres-composition__item ${item.put ? "active" : ""}`} key={`parametres-composition-${index}`} onClick={()=>{changeCompositionHundler(item)}}>
                                                            <div className="parametres-composition__img">
                                                                {compositionIcons[item.value]}
                                                            </div>
                                                            <div className="parametres-composition__name">{item.name}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="parametres__dough parametres__row">
                                            {
                                                productDough.map((item, index)=>{
                                                    return (
                                                        <button key={`parametres-dough-${index}`} className={`${item.id === productData.dough.id ? "active": ""} parametres__btn parametres__btn--dough`} type="button" onClick={()=>{setProductDataDoughHundler(item)}}>{item.name}</button>
                                                    )
                                                })
                                            }
                                    </div>
                                    <div className="parametres__size parametres__row">
                                            {
                                                productSize.map((item, index)=>{
                                                    return (
                                                        <button key={`parametres-size-${index}`} className={`${item.id === productData.size.id ? "active": ""} parametres__btn parametres__btn--size`} type="button" onClick={()=>{setProductDataSizeHundler(item)}}>{item.name}</button>
                                                    )
                                                })
                                            }
                                    </div>
                                    <div className="parametres__addition parametres-addition">
                                        <h4>Добавьте в пиццу</h4>
                                        <div className="parametres-addition__list">
                                            {
                                                productData.compositionAdd.filter(item=>{return item.checked}).map((item, index)=>{
                                                    return (
                                                        <div className={`parametres-addition__item ${item.add ? "active" : ""}`} key={`parametres-addition-${index}`} onClick={()=>{changeCompositionAddHundler(item)}}>
                                                            <div className="parametres-addition__img">
                                                                {compositionIcons[item.value]}
                                                            </div>
                                                            <div className="parametres-addition__name">{item.name}</div>
                                                            <div className="parametres-addition__price">{item.price} {currency}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="parametres__footer">
                                        <div>
                                            <div className="parametres__total">Итого: {productData.price} {currency}</div>
                                            <div className="parametres__weight">{productData.weight} г</div>
                                        </div>

                                        <Link to="" className="btn">Добавить</Link>
                                    </div>

                                </div>
                
                            </div>
                        }


                    </div>
                </div>
    )
}


export default Parametres