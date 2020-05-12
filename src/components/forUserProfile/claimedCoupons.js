import React, { Component } from 'react';
import SimpleTabHeader from '../companyHeader/forUserProfile/simbleTabHeader'
import CouponFeed4 from '../coupon/couponFeed4';

class ClaimedCoupons extends Component {
    state = {  }
    render() { 
        const {couponsValid,oldCoupons}=this.props

        let activeContent, oldContent

        if (couponsValid.length===0){
            activeContent=<h6>No active Coupons Claimed.</h6>
        }else{
            activeContent=
                <CouponFeed4 coupons={couponsValid}/>
        }

        if (oldCoupons.length===0){
            oldContent=<h6>No expired Coupons.</h6>
        }else{
            oldContent=
            <CouponFeed4 coupons={oldCoupons}/>
        }
        return ( 
            <React.Fragment>
                <div className="row">
                  <div className="col-md-3 col-sm-0"/>
                  <div className="col-md-9 col-sm-12">
                    <SimpleTabHeader title={"Coupons"}/>

                    <div className="tab-content">
                    <div role="tabpanel" className="tab-pane" id="old">{oldContent}</div>
                    <div role="tabpanel" className="tab-pane active" id="active">{activeContent}</div>
                    </div>

                  </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default ClaimedCoupons;