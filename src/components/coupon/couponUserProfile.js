import React, { Component } from 'react';
import logo from '../../assets/images/stores/dz.png';

class CouponUserProfile extends Component {
    
    render() { 
        const {offer_title, slug, title}=this.props.coupon.coupon_info
        const {name}=this.props.coupon.store_info
        return ( 
            <React.Fragment>
                <a href="javascript:void(0)" onClick={()=>this.props.openClick(this.props.coupon.qr_image,name)}>
                <div className="" id="newCoupon">
                    <div id="logoDiv">
                        <img src={logo} alt=""/>
                    </div>
                    <div id="offerOff">
                        <h3>{title}</h3>
                        {offer_title}
                    </div>
                    <div id="offerDes">
                    {name}
                    </div>
                    <div id="seeOthers">
                    Click to view coupon
                    </div>
                </div>
                </a>
            </React.Fragment>
         );
    }
}
 
export default CouponUserProfile;