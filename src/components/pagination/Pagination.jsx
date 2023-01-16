import React from 'react';
import './Pagination.scss'

function Pagination ({products, message}) {
    const [paginationData, setPaginationData] = React.useState({
        currentPage: 1,
        pages: [],
        countPerPage: 8,
    })

    function setPages (length) {
        let countPages = Math.ceil(length / paginationData.countPerPage)
        let pages = []
        for(let i = 0; i < countPages; i++) {
            pages.push(i + 1)
        }
        return pages
    }
    function checkRangePosition (index) {
        return (index < (paginationData.currentPage * paginationData.countPerPage)) && (index >= ((paginationData.currentPage * paginationData.countPerPage) - paginationData.countPerPage)) ? true : false
    }
    function swithPage (page) {
        if (paginationData.pages.find(item=>{return page === item})) {
            setPaginationData({...paginationData, currentPage: page})
        }
    }
    React.useEffect(()=>{
        if (products.length) {
            setPaginationData({...paginationData, pages: setPages (products.length)})
        }
    }, [products])
    let filteringProducts = products.filter((product, index)=>{
        return checkRangePosition(index)
    })
    return (

        <>
            {
                filteringProducts.length ? filteringProducts : message
            }
            {
                filteringProducts.length ? <div className="col-12">
                <div className="pagination">
                    <button className='pagination__btn btn' onClick={()=>{swithPage(paginationData.currentPage - 1)}}>{'<'}</button>
                    {paginationData.pages.map(page=>{
                        return (
                            <button className={`pagination__btn btn btn--inversion ${page === paginationData.currentPage ? 'active' : ''}`} key={`${page}-page`} onClick={()=>{swithPage(page)}}>{page}</button>
                        )
                    })}
                    <button className='pagination__btn btn' onClick={()=>{swithPage(paginationData.currentPage + 1)}}>{'>'}</button>
                </div>
            </div> : null
            }

                
            


        </>



    )
}

export default Pagination