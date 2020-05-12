import React, { Component } from 'react';
import Spinner from './spinner'

class CouponsLoading extends Component {
    render() { 
        const array=[1,2,3,4,5,6]
        return ( 
            <div className="row">
			{array.map(coupon => (
				<div key={coupon} className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                    <div id="newCoupon">
                        <Spinner/>
                    </div>
                </div>
			))}
			</div>
         );
    }
}
 
export default CouponsLoading;