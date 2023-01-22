
import { editIcon, deleteIcon } from "../../assets/icons/iconsSvg"

function AdminProductItem({item, setModeEditProductHundler, editProductHundler, deleteProductHandler, index}) {
    return ( 
        <tr className="admin-product__row">
            <td className="admin-product__col">
                {index + 1}
            </td>
            <td className="admin-product__col">
                <img src={`${item.imgPath}`} alt="" className="admin-product__img" />         
            </td>
            <td className="admin-product__col">
                <p className="admin-product__name">{item.name}</p>       
            </td>
            <td className="admin-product__col">
                <p className="admin-product__composition">{item.composition.filter(item=>{return item.checked}).map(item=>{return item.name}).join(', ')}</p>
            </td>
            <td className="admin-product__col">
                <p className="admin-product__composition">{item.compositionAdd.filter(item=>{return item.checked}).map(item=>{return item.name}).join(', ')}</p>
            </td>
            <td className="admin-product__col">
                <p className="admin-product__price">{item.price}</p>
            </td>
            <td className="admin-product__col">
                <p className="admin-product__date">{item.date.match(/[0-9]{4}.[0-9]{2}.[0-9]{2}/)}</p>
            </td>
            <td className="admin-product__col tcenter">
                <button className="admin-product__btn btn" type="button" onClick={()=>{setModeEditProductHundler(); editProductHundler(item)}}>{editIcon}</button>
            </td>
            <td className="admin-product__col tcenter">
                <button className="admin-product__btn btn" type="button" onClick={()=>{deleteProductHandler(item._id)}}>{deleteIcon}</button>
            </td>
         </tr>
     );
}

export default AdminProductItem;