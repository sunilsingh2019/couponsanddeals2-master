import React, { Component } from 'react';
import CouponDescription from './couponDescription'

class CouponDescriptionDiv extends Component {
    render() { 
        const {store, coupons}=this.props
        return ( 
            <React.Fragment>
                <div id="merchantOffers">
		    	    <div className="oneBlock">
		    	    <h4 className="newTopic">{store.name} Top Coupons</h4>
		    	    	{coupons.map(coupon => (
		    	    		<CouponDescription key={coupon.id} coupon={coupon} />
		    	    	))}
		    	    </div>
		    	</div>
            </React.Fragment>
         );
    }
}
 
export default CouponDescriptionDiv;