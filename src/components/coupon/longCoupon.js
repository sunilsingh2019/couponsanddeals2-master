import React, { Component } from 'react';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom' 

class LongCoupon extends Component {
    render() { 
        const {coupon}=this.props
        return ( 
            <div id="longCoupon">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-sm-12">
                            {/* <h1>Rs <span>200</span> CASHBACK!</h1> */}
                            <h1>{coupon.title}</h1>
                            <h2>{coupon.offer_title}</h2>
                            <h3><FontAwesomeIcon icon={faClock}/>Valid Till {coupon.valid.end_valid}</h3>
                        </div>

                        <div className="col-md-3 col-sm-12">
                            <h6><span>{coupon.views}</span> viewed Today</h6>
                            <h5><Link to={"/coupons/"+coupon.slug}>View Detail</Link></h5>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default LongCoupon;