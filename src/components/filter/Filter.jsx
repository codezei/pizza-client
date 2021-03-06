import "./Filter.scss"
import {closeIcon} from "../../assets/icons/iconsSvg"
import {useDispatch, useSelector} from "react-redux"
import React from 'react';
import {addFilter, deleteFilter} from "../../reducers/productsReducer"



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

    function goBackHundler () {
        window.history.back();
    }


    function changeActiveCategoryHundler (categoryName, compositionValue) {


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
        console.log(categoriesData.map(item=>{
            return item.composition
        }).flat().filter(item=>{return item.active}).map(item=>{return item.value}))
        setActiveCategory(categoriesData.map(item=>{
            return item.composition
        }).flat().filter(item=>{return item.active}).map(item=>{return item.value}))

    }

    // React.useEffect(()=>{
    //     console.log(categoriesData)
    // }, [])


    return (
        <div className="popup">
            <div className="popup__inner filter">
                <div className="filter__header">
                    <h2 className="filter__title">??????????????</h2>
                    <button type="button" onClick={goBackHundler} className="filter__close">{closeIcon}</button>
                </div>
                <div className="filter__content">
                    {
                        categoriesData.map((categoryItem, categoryIndex)=>{
                            return (
                            <div key={`category-${categoryIndex}`} className="filter__item">
                                <h3 className="filter__category">{categoryItem.category}</h3>
                                
                                {
                                    categoryItem.composition.map((compositionItem, compositionIndex)=>{
                                        return (
                                            <button className={`filter__btn ${compositionItem.active ? "active" : ""}`} key={`composition-${compositionIndex}`} onClick={()=>{changeActiveCategoryHundler(categoryItem.category, compositionItem.value)}}>{compositionItem.name}</button>
                                        )
                                    })
                                }
                            </div>
                            )
                        })
                    }
                </div>
               

                <div className="filter__footer">
                    <button className="btn btn--inversion filter__reset" onClick={deleteFiterHundler}>????????????????</button>
                    <button className="btn filter__accept" onClick={addFilterHundler}>??????????????????</button>
                </div>


            </div>
        </div>
        
    )

}

export default Filter