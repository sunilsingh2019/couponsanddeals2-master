import React, { Component } from 'react';
import CouponNew from './couponNew';

class CouponFeed4 extends Component {
    render() { 
        const {coupons}=this.props
        return ( 
            <React.Fragment>
					<div className="row">
                    {coupons.map((coupon,i) => (
						<div key={i} className="col-lg-3 col-md-4 col-sm-6 col-xs-12 col-12">
                            <CouponNew key={coupon.id} coupon={coupon}/>
                        </div>
					))}
                    </div>
            </React.Fragment>
         );
    } 
}
 
export default CouponFeed4;