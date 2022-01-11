

function Admin () {
    return (
        <div className="admin">
            <div className="container">
                <div className="add-product">
                    <h3 className="add-product__title">Добавить товар</h3>
                    <form className="add-product__form">
                        <div className="add-product__row">
                            <label htmlFor="file">Изображение</label>
                            <input type="file" name="" id="file" />
                        </div>
                        <div className="add-product__row">
                            <label htmlFor="name">Имя</label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div className="add-product__row">
                            <label htmlFor="composition">Состав</label>
                            <input type="text" name="composition" id="composition" />
                        </div>
                        <div className="add-product__row">
                            <label htmlFor="price">Цена</label>
                            <input type="text" name="price" id="price" />
                        </div>
                        <button className="add-product__btn btn">Добавить</button>
                    </form>
                </div>
                <div className="list-product">
                    <h3 className="list-product__title">Список товаров</h3>
                </div>

            </div>
        </div>
    )
}

export default Admin