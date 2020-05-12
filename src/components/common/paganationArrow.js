import React, { Component } from 'react';

class PaganationArrow extends Component {
    render() { 
        const {itemsCount, pageSize, onPageUp, onPageDown, currentPage}=this.props;
        const pagesCount=Math.ceil(itemsCount/pageSize);
        return ( 
            <React.Fragment>
                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <a onClick={()=>onPageDown(currentPage, pagesCount)} className="page-link">&lt;</a>
                        </li>
                        <li className="page-item">
                            <a onClick={()=>onPageUp(currentPage, pagesCount)} className="page-link">&gt;</a>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
         );
    }
}
 
export default PaganationArrow;