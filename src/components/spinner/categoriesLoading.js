import React from 'react';
import Spinner from './spinner';

const CategoriesLoading = () => {
    const array=[1,2,3,4,5,6]
    return ( 
        <div className="row">
			{array.map(deal => (
				<div className="col-lg-2 col-md-3 col-sm-4 col-6" key={deal}>
					<div id="categoryBox1">
                    <div className="store"> 
                        <div className="shopImgDiv">
                            <Spinner/>
                        </div>
                        <div className="shopDesDiv">
                        </div>
                    </div>
                </div>
				</div>
			))} 
		</div>
    )
}
 
export default CategoriesLoading;