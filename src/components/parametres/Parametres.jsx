import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import React from 'react';
import Loader from "../loader/Loader"
import {compositionIcons} from "../../assets/icons/iconsSvg"
import "./Parametres.scss"
import {API_URL} from "../../config"
import {useNavigate, Link, useLocation, useHistory} from "react-router-dom"
import {closeIcon} from "../../assets/icons/iconsSvg"
import {addToCart} from "../../reducers/cartReducer"
import {incrementCountProduct} from '../../reducers/cartReducer'

function Parametres () {
    let {id} = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state=>{return state.products.products}).filter(item=>{return item._id === id})[0]
    const currency =  useSelector(state=>{return state.app.currency})
    const cartList = useSelector(state=>{return state.cart.cartList})
    const productSize = useSelector(state=>{return state.app.productSize})
    const productDough = useSelector(state=>{return state.app.productDough})
    const [productData, setProductData] = React.useState({
        ...product, size: productSize[0], dough: productDough[0], count: 1, key: product._id
    })

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
    function addProductToCartHundler () {
        if (compareProducts()) {
            dispatch(incrementCountProduct(productData))
        } else {
            
            dispatch(addToCart({...productData, key: new Date().getTime()}))
            setProductData({...productData, key: new Date().getTime()})
        }
        
    }



    function goBackHundler () {

        // navigate(`/`)
        window.history.back()
    }

    function compareProducts () {
        let equal = false
        let cartProduct = cartList.find(item=>{
            return item._id === productData._id
        })
        if (cartProduct && JSON.stringify([cartProduct.composition, cartProduct.compositionAdd, cartProduct.dough, cartProduct.size]) === JSON.stringify([productData.composition, productData.compositionAdd, productData.dough, productData.size])) {
            equal = true
        }
        return equal
    }

    React.useEffect(()=>{
        
        setProductData({
            ...productData, 
            ...product
        })

    }, [product])

    return (

                <div className="popup" onClick={(e)=>{if(e.target === e.currentTarget) {goBackHundler()}}}>
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

                                        <Link to="/" className="btn" onClick={()=>{addProductToCartHundler()}}>Добавить</Link>
                                    </div>

                                </div>
                
                            </div>
                        }


                    </div>
                </div>
    )
}


export default Parametres