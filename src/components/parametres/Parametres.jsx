import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import React from 'react';
import {compositionIcons} from "../../assets/icons/iconsSvg"
import "./Parametres.scss"
import {API_URL} from "../../config"
import {Link} from "react-router-dom"
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
        ...product, size: productSize[0], dough: productDough[0], count: 1, key: product?._id ? product._id : null
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
            if (cartList.length) {
                dispatch(addToCart({...productData, key: new Date().getTime()}))
                setProductData({...productData, key: new Date().getTime()})
            } else {
                dispatch(addToCart(productData))
            }


        }
        
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
        setProductData({...productData, ...product, key: product?._id ? product._id : null})
    }, [product])

    return (
        product?._id ? <div className="parametres">
                <div className="parametres__inner">
                    <img src={`${API_URL}/${product.imgPath}`} alt="" className="parametres__img" />
                    <div className="parametres__data">
                        <h3 className="parametres__title">{product.name}</h3>
                        <div className="parametres__composition parametres-composition">
                            <div className="parametres-composition__list row">
                                {
                                productData?.composition && productData.composition.filter(item=>{return item.checked}).map((item, index)=>{
                                        return (
                                            <div className="col-6 col-md-3 parametres-composition__col" key={`parametres-composition-${index}`}>
                                                <div className={`parametres-composition__item ${item.put ? "active" : ""}`}  onClick={()=>{changeCompositionHundler(item)}}>
                                                    <div className="parametres-composition__img">
                                                        {compositionIcons[item.value]}
                                                    </div>
                                                    <div className="parametres-composition__name">{item.name}</div>
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="parametres__dough row">
                                {
                                    productDough.map((item, index)=>{
                                        return (
                                            <div className="col-12 col-sm-6">
                                                <button key={`parametres-dough-${index}`} className={`${item.id === productData.dough.id ? "active": ""} parametres__btn parametres__btn--dough`} type="button" onClick={()=>{setProductDataDoughHundler(item)}}>{item.name}</button>
                                            </div>
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
                            <h4 className="parametres-addition__title">Добавьте в пиццу</h4>
                            <div className="parametres-addition__list row">
                                {
                                   productData?.compositionAdd && productData.compositionAdd.filter(item=>{return item.checked}).map((item, index)=>{
                                        return (
                                            <div className="col-6 col-md-3 parametres-addition__col" key={`parametres-addition-${index}`}>
                                                <div className={`parametres-addition__item ${item.add ? "active" : ""}`}  onClick={()=>{changeCompositionAddHundler(item)}}>
                                                    <div className="parametres-addition__img">
                                                        {compositionIcons[item.value]}
                                                    </div>
                                                    <div className="parametres-addition__name">{item.name}</div>
                                                <div className="parametres-addition__price">{item.price} {currency}</div>
                                                </div>
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
            </div> : <div></div>

    )
}


export default Parametres