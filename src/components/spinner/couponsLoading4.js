import React, { Component } from 'react';
import Spinner from './spinner'

class CouponsLoading4 extends Component {
    state = {  }
    render() { 
        const array=[1,2,3,4]
        return ( 
            <div className="row">
			{array.map(coupon => (
				<div key={coupon} className="col-lg-3 col-sm-6 col-6">
                    <div id="newCoupon">
                        <Spinner/>
                    </div>
                </div>
			))}
			</div>
         );
    }
}
 
export default CouponsLoading4;