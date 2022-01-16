import {editProductAction} from "../../../actions/products"
import {useDispatch} from "react-redux"
import React from 'react'
import { API_URL } from "../../../config"

function EditProduct (props) {
    const dispatch = useDispatch()
    const [loadedImg, setLoadedImg] = React.useState(null)
    const [productData, setProductData] = React.useState({
        "product-file": "",
        "product-name": "",
        "product-composition": "",
        "product-price": ""
    })
    function setProductDataHundler (target) {
        if (target.type === 'file') {
            createImg(target)
            setProductData({...productData, [target.name]: target.files[0]})
        } else {
            setProductData({...productData, [target.name]: target.value})
        }
    }
    function createImg (data) {
        let reader = new FileReader();
        reader.readAsDataURL(data.files[0]);
        reader.onload = function(e) {
            setLoadedImg(e.target.result)
        };
    }

    React.useEffect(()=>{
        setProductData({
            id: props.product._id,
            "product-file": "",
            "product-name": props.product.name,
            "product-composition": props.product.composition,
            "product-price": props.product.price,
            imgPath: props.product.imgPath
        })
    }, [])


    return (
        <div className="add-product">
            <h3 className="add-product__title">Изменить товар</h3>
            <form className="form add-product__form" onSubmit={
                (e)=> {
                    e.preventDefault()
                    dispatch(editProductAction(productData))
                    setProductData({
                        "product-file": "",
                        "product-name": "",
                        "product-composition": "",
                        "product-price": "",
                 
                    })
                    e.target.reset()
                    props.setModeAddProductHundler()
                }
            }>
                <div className="form__row">
                    <label htmlFor="product-file" className="form__label">Изображение</label>
                    <input type="file" name="product-file" id="product-file" className="input form__input" accept="image/*" onChange={(e)=> {setProductDataHundler(e.target)}} />
                    {
                         <img src={loadedImg ? loadedImg : `${API_URL}/${props.product.imgPath}`} alt="" />
                    }
                </div>
                <div className="form__row">
                    <label htmlFor="product-name" className="form__label">Имя</label>
                    <input required type="text" name="product-name" id="product-name" className="input form__input" onChange={(e)=> {setProductDataHundler(e.target)}} value={productData['product-name']} />
                </div>
                <div className="form__row">
                    <label htmlFor="product-composition" className="form__label">Состав</label>
                    <input required type="text" name="product-composition" id="product-composition" className="input form__input" onChange={(e)=> {setProductDataHundler(e.target)}} value={productData['product-composition']} />
                </div>
                <div className="form__row">
                    <label htmlFor="product-price" className="form__label">Цена</label>
                    <input required type="number" name="product-price" id="product-price" className="input form__input" onChange={(e)=> {setProductDataHundler(e.target)}} value={productData['product-price']} />
                </div>
                <button className="form__btn btn">Изменить</button>
            </form>
        </div>
    )
}


export default EditProduct