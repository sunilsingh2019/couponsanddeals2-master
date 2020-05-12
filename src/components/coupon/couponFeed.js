import React, { Component } from 'react';
import CouponNew from './couponNew';

class CouponFeed extends Component {
    render() { 
        const {coupons}=this.props
        return ( 
            <React.Fragment>
                <div className="row">
					{coupons.map(coupon => (
						<div key={coupon.id} className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                            <CouponNew coupon={coupon}/>
                        </div>
					))}
					</div>
            </React.Fragment>
         );
    }
}
 
export default CouponFeed;