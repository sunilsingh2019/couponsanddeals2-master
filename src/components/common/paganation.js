import React, { Component } from 'react';

const Paganation = props => {
    // const {itemsCount, pageSize, onPageChange, currentPage}=props;
    // const pagesCount=itemsCount/pageSize;
    // const pages=Array.apply(null, {length: pagesCount+1}).map(Number.call, Number)
    const {currentPage, prev, next, onPageUp, onPageDown}=props
    return (
    // <nav> 
    //     <ul className="pagination">
    //         {pages.map(page=>(
    //             <li key={page+1} className="page-item">
    //                 <a className="page-link" onClick={()=>onPageChange(page)}> {page+1}</a>
    //             </li>
    //         ))}
    //     </ul>
    // </nav>
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li onClick={()=>onPageDown(prev, currentPage)} className={`page-item ${prev ? '' : 'disabled'}`}>
          <a className="page-link" href="#" aria-label="Previous" aria-disabled={prev}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li className="page-item"><a className="page-link" href="#">{currentPage}</a></li>

        <li onClick={()=>onPageUp(next, currentPage)} className={`page-item ${next ? '' : 'disabled'}`}>
          <a className="page-link" href="#" aria-label="Next" aria-disabled={next}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    )  
    
}
 
export default Paganation;