import { addProductAction } from "../../../actions/products"
import { useDispatch, useSelector } from "react-redux"
import React from 'react'

function AddProduct() {
    const dispatch = useDispatch()
    const [loadedImg, setLoadedImg] = React.useState(null)
    let addComposition = useSelector(state => { return state.products.addComposition })
    const [productData, setProductData] = React.useState({
        "product-file": "",
        "product-name": "",
        "product-composition": [...addComposition],
        "product-price": "",
        "product-composition-add": [...addComposition]
    })
    function setProductDataHundler(target, product) {
        if (target.type === 'file') {
            createImg(target)
            setProductData({ ...productData, [target.name]: target.files[0] })
        } else if (target.type === 'checkbox') {
            setProductData({
                ...productData, [target.name]: productData[target.name].map((item) => {
                    return product.value === item.value ? { ...item, checked: !item.checked } : item
                })
            })
        } else {
            setProductData({ ...productData, [target.name]: target.value })
        }
    }
    function createImg(data) {
        let reader = new FileReader();
        reader.readAsDataURL(data.files[0]);
        reader.onload = function (e) {
            setLoadedImg(e.target.result)
        };
    }

    function addProductHandler (e) {
        e.preventDefault()
        dispatch(addProductAction(productData))
        setProductData({
            "product-file": "",
            "product-name": "",
            "product-composition": [...addComposition],
            "product-price": "",
            "product-composition-add": [...addComposition],
        })
        e.target.reset()
        setLoadedImg(null)
    }



    return (
        <div className="add-product">
            <h3 className="add-product__title">Добавить товар</h3>
            <div className="add-product__form">
                <form className="form" onSubmit={addProductHandler}>
                    <div className="row form__row">
                        <div className="col-xl-4 col-md-12 form__col">
                            <label htmlFor="product-file" className="form__label">Изображение</label>
                            <input required type="file" name="product-file" id="file" className="input form__input" accept="image/*" onChange={(e) => { setProductDataHundler(e.target) }} />
                            {
                                loadedImg ? <img src={loadedImg} alt="" /> : null
                            }
                        </div>
                        <div className="col-xl-4 col-md-6 form__col">
                            <label htmlFor="product-name" className="form__label">Имя</label>
                            <input required type="text" name="product-name" id="name" className="input form__input" onChange={(e) => { setProductDataHundler(e.target) }} value={productData['product-name']} />
                        </div>
                        <div className="col-xl-4 col-md-6 form__col">
                            <label htmlFor="product-price" className="form__label">Цена</label>
                            <input required type="number" name="product-price" id="price" className="input form__input" onChange={(e) => { setProductDataHundler(e.target) }} value={productData['product-price']} />
                        </div>
                        <div className="col-xl-6 col-md-6 form__col">
                            <label className="form__label">Состав</label>


                            <div className="form__checkbox-list">
                                {
                                    productData['product-composition'].map((item, index) => {

                                        return (
                                            <div className="form__checkbox" key={`product-composition-${index}`}>
                                                <input checked={item.checked} className="checkbox" type="checkbox" name="product-composition" id={`product-composition-${index}`} onChange={(e) => { setProductDataHundler(e.target, item) }} />
                                                <label htmlFor={`product-composition-${index}`} className="form__label form__label--checkbox">{item.name}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {/* <input required type="text" name="product-composition" id="composition" className="input form__input" onChange={(e)=> {setProductDataHundler(e.target)}} value={productData['product-composition']} /> */}
                        </div>
                        <div className="col-xl-6 col-md-6 form__col">
                            <label className="form__label">Дополнительные ингридиенты</label>
                            <div className="form__checkbox-list">
                                {
                                    productData['product-composition-add'].map((item, index) => {

                                        return (
                                            <div className="form__checkbox" key={`product-composition-add-${index}`}>
                                                <input checked={item.checked} className="checkbox" type="checkbox" name="product-composition-add" id={`product-composition-add-${index}`} onChange={(e) => { setProductDataHundler(e.target, item) }} />
                                                <label htmlFor={`product-composition-add-${index}`} className="form__label form__label--checkbox">{item.name}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className="col-xl-12 form__col">
                            <button className="form__btn btn">Добавить</button>
                        </div>
                    </div>
            </form>
            </div>

        </div>
    )
}


export default AddProduct