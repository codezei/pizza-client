import "./Filter.scss"
import {closeIcon} from "../../assets/icons/iconsSvg"
import {useDispatch, useSelector} from "react-redux"
import React from 'react';
import {addFilter, deleteFilter} from "../../reducers/productsReducer"
import {changeFilterPopup} from "../../reducers/appReducer"


function Filter () {


    const dispatch = useDispatch()
    const filter = useSelector(state=>{return state.products.filter})
    const [activeCategory, setActiveCategory] = React.useState([...filter])
    const composition = useSelector(state=>{return state.products.addComposition})
    
    let categories = Array.from(new Set(composition.map(item=>{return item.category}))).map((category=>{
        
        return {
            category: category,
            composition: composition.filter(item=>{return item.category === category}).map(item=>{
                return {...item, active: activeCategory.some(activeCategoryItem=>{return item.value === activeCategoryItem}) ? true : false}
            })
        }
    }))

    const [categoriesData, setCategoriesData] = React.useState([...categories])

    
    function addFilterHundler () {
        dispatch(addFilter(activeCategory))
    }
    function deleteFiterHundler () {
        setActiveCategory([])
        setCategoriesData(
            categoriesData.map(item=>{
                return {
                    ...item,
                    composition: item.composition.map(item=>{
                        return {
                            ...item,
                            active: false
                        }
                    })
                }
            })
        )
        dispatch(deleteFilter())
    }

    function changeFilterPopupHandler () {
        dispatch(changeFilterPopup())
    }
    function changeActiveCategoryHundler (categoryName, compositionValue, active) {
        setCategoriesData(
            categoriesData.map((categoriesItem)=>{
                if (categoryName === categoriesItem.category) {
                    return {
                        category: categoryName,
                        composition: categoriesItem.composition.map((compositionItem)=>{
                            if (compositionItem.value === compositionValue) {
                                return {
                                    ...compositionItem,
                                    active: !compositionItem.active
                                }
                            } else {
                                return compositionItem
                            }
                        })
                    }
                } else {
                    return categoriesItem
                }
            })
        )
            if (active) {
                setActiveCategory([...activeCategory.filter(item=>{ return item !== compositionValue})])
            } else {
                setActiveCategory([...activeCategory, compositionValue])
            }
    }


    return (
        <div className="popup" onClick={(e)=>{if(e.target === e.currentTarget) {changeFilterPopupHandler()}}}>
            <div className="popup__inner popup__inner--side filter">
                <div className="popup__header">
                    <h2 className="popup__title popup__title--side">Фильтры</h2>
                    <button type="button" onClick={changeFilterPopupHandler} className="popup__close popup__close--side">{closeIcon}</button>
                </div>
                <div className="popup__content">
                    {
                        categoriesData.map((categoryItem, categoryIndex)=>{
                            return (
                            <div key={`category-${categoryIndex}`} className="filter__item">
                                <h3 className="filter__category">{categoryItem.category}</h3>
                                {
                                    categoryItem.composition.map((compositionItem, compositionIndex)=>{
                                        return (
                                            <button className={`filter__btn ${compositionItem.active ? "active" : ""}`} key={`composition-${compositionIndex}`} onClick={()=>{changeActiveCategoryHundler(categoryItem.category, compositionItem.value, compositionItem.active)}}>{compositionItem.name}</button>
                                        )
                                    })
                                }
                            </div>
                            )
                        })
                    }
                </div>
               

                <div className="filter__footer">
                    <button className="btn btn--inversion filter__reset" onClick={deleteFiterHundler}>Сбросить</button>
                    <button className="btn filter__accept" onClick={addFilterHundler}>Применить</button>
                </div>


            </div>
        </div>
        
    )

}

export default Filter