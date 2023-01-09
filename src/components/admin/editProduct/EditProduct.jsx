import { editProductAction } from "../../../actions/products"
import { useDispatch, useSelector } from "react-redux"
import React from 'react'
import { API_URL } from "../../../config"

function EditProduct(props) {
    const dispatch = useDispatch()
    const [loadedImg, setLoadedImg] = React.useState(null)
    const addComposition = useSelector(state => { return state.products.addComposition })
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
    function editProductHundler(e) {
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


    React.useEffect(() => {
        setProductData({
            id: props.product._id,
            "product-file": "",
            "product-name": props.product.name,
            "product-composition": props.product.composition,
            "product-price": props.product.price,
            imgPath: props.product.imgPath,
            "product-composition-add": props.product.compositionAdd,
        })
    }, [])


    return (
        <div className="add-product">
            <h3 className="add-product__title">Изменить товар</h3>
            <div className="add-product__form">
                <form className="form" onSubmit={editProductHundler}>
                    <div className="row form__row">
                        <div className="form__row col-xl-4 col-md-12 form__col">
                            <label htmlFor="product-file" className="form__label">Изображение</label>
                            <input type="file" name="product-file" id="product-file" className="input form__input" accept="image/*" onChange={(e) => { setProductDataHundler(e.target) }} />
                            {
                                <img src={loadedImg ? loadedImg : `${API_URL}/${props.product.imgPath}`} alt="" />
                            }
                        </div>
                        <div className="form__row col-xl-4 col-md-6 form__col">
                            <label htmlFor="product-name" className="form__label">Имя</label>
                            <input required type="text" name="product-name" id="product-name" className="input form__input" onChange={(e) => { setProductDataHundler(e.target) }} value={productData['product-name']} />
                        </div>
                        <div className="form__row col-xl-4 col-md-6 form__col">
                            <label htmlFor="product-price" className="form__label">Цена</label>
                            <input required type="number" name="product-price" id="product-price" className="input form__input" onChange={(e) => { setProductDataHundler(e.target) }} value={productData['product-price']} />
                        </div>
                        <div className="form__row col-xl-6 col-md-6 form__col">
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

                        </div>
                        <div className="form__row col-xl-6 col-md-6 form__col">
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
                            <button className="form__btn btn">Изменить</button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}


export default EditProduct