
import AdminProductItem from "./AdminProductItem";

function AdminProductList({products, modeEditProduct, setModeEditProductHundler, editProductHundler, deleteProductHandler}) {
    return ( 
        <div className="admin-list">
            <h3 className="admin-list__title">Список товаров</h3>
            { products.length ?
            <table className={`admin-product ${modeEditProduct ? 'admin-product--edit' : ''}`}>
                <tbody>
                    <tr className="admin-product__row">
                        <th className="admin-product__col">№</th>
                        <th className="admin-product__col">Изображение</th>
                        <th className="admin-product__col">Название</th>
                        <th className="admin-product__col">Состав</th>
                        <th className="admin-product__col">Дополнительные ингридиенты</th>
                        <th className="admin-product__col">Стоимость</th>
                        <th className="admin-product__col">Дата</th>
                        <th className="admin-product__col">Редактировать</th>
                        <th className="admin-product__col">Удалить</th>
                    </tr>
                    {

                        products.map((item, index)=>{
                            return  (
                                <AdminProductItem 
                                    key={`product-${index}`} 
                                    setModeEditProductHundler={setModeEditProductHundler} 
                                    editProductHundler={editProductHundler} 
                                    deleteProductHandler={deleteProductHandler} 
                                    item={item} 
                                    index={index}
                                ></AdminProductItem>
                            )
                        })
                    }

                </tbody>
            </table>
            :
            "Список товаров пуст"
            }
        </div>
     );
}

export default AdminProductList;