import "./Filter.scss"
import {useNavigate} from "react-router-dom"
import {closeIcon} from "../../assets/icons/iconsSvg"
import {useSelector} from "react-redux"
import React from 'react';



function Filter () {


    const composition = useSelector(state=>{return state.products.addComposition})
    let categories = Array.from(new Set(composition.map(item=>{return item.category}))).map((category=>{
        return {
            category: category,
            composition: composition.filter(item=>{return item.category === category}).map(item=>{
                return {...item, active: false}
            })
        }
    }))

    const navigate = useNavigate()
    function goBackHundler () {
        navigate('/')
    }
    const [categoriesData, setCategoriesData] = React.useState([...categories])
    const [activeCategory, setActivecategory] = React.useState([])

    function changeActiveCategoryHundler () {

    }

    React.useEffect(()=>{
        console.log(categoriesData)
    }, [])


    return (
        <div className="popup">
            <div className="popup__inner popup__inner--fiter">
            <button type="button" onClick={goBackHundler} className="popup__close">{closeIcon}</button>
                <div className="filter">Filter</div>
                {
                    categoriesData.map((categoryItem, categoryIndex)=>{
                        return (
                           <div key={`category-${categoryIndex}`}>
                               {categoryItem.category}
                               {
                                   categoryItem.composition.map((compositionItem, compositionIndex)=>{
                                       return (
                                           <button key={`composition-${compositionIndex}`} onClick={()=>{changeActiveCategoryHundler()}}>{compositionItem.name}</button>
                                       )
                                   })
                               }
                           </div>
                        )
                    })
                }
            </div>
        </div>
        
    )

}

export default Filter