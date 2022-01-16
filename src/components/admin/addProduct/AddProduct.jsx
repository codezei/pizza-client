import {addProductAction} from "../../../actions/products"
import {useDispatch} from "react-redux"
import React from 'react'

function AddProduct () {
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

    return (
        <div className="add-product">
            <h3 className="add-product__title">Добавить товар</h3>
            <form className="form add-product__form" onSubmit={
                (e)=> {
                    e.preventDefault()
                    dispatch(addProductAction(productData))
                    setProductData({
                        "product-file": "",
                        "product-name": "",
                        "product-composition": "",
                        "product-price": ""
                    })
                    e.target.reset()
                    setLoadedImg(null)
                }
            }>
                <div className="form__row">
                    <label htmlFor="product-file" className="form__label">Изображение</label>
                    <input required type="file" name="product-file" id="file" className="input form__input" accept="image/*" onChange={(e)=> {setProductDataHundler(e.target)}} />
                    {
                         loadedImg ? <img src={loadedImg} alt="" /> : null
                    }
                </div>
                <div className="form__row">
                    <label htmlFor="product-name" className="form__label">Имя</label>
                    <input required type="text" name="product-name" id="name" className="input form__input" onChange={(e)=> {setProductDataHundler(e.target)}} value={productData['product-name']} />
                </div>
                <div className="form__row">
                    <label htmlFor="product-composition" className="form__label">Состав</label>
                    <input required type="text" name="product-composition" id="composition" className="input form__input" onChange={(e)=> {setProductDataHundler(e.target)}} value={productData['product-composition']} />
                </div>
                <div className="form__row">
                    <label htmlFor="product-price" className="form__label">Цена</label>
                    <input required type="number" name="product-price" id="price" className="input form__input" onChange={(e)=> {setProductDataHundler(e.target)}} value={productData['product-price']} />
                </div>
                <button className="form__btn btn">Добавить</button>
            </form>
        </div>
    )
}


export default AddProduct