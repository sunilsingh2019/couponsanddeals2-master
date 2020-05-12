import React, { Component } from 'react';
import SimpleHeader from '../../components/companyHeader/simpleHeader'
import ProfileBox from './profileBox'

class UserOverview extends Component {
    render() { 
        const {userDetails}=this.props
        return ( 
            <React.Fragment>
                <div className="row">
                  <div className="col-lg-3 col-md-0"/>
                  <div className="col-lg-9 col-md-12"><SimpleHeader title={"Overview"}/></div>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <ProfileBox image={"shop.png"} data={"Store Following"} number={userDetails.follow_stores.length}/>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <ProfileBox image={"coupon.png"} data={"Store Following"} number={userDetails.follow_stores.length}/>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <ProfileBox image={"tag.png"} data={"Store Following"} number={userDetails.follow_stores.length}/>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <ProfileBox image={"couponBlue.png"} data={"Store Following"} number={userDetails.follow_stores.length}/>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <ProfileBox image={"couponGreen.png"} data={"Coupons Active"} number={userDetails.valid_coupons.length}/>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <ProfileBox image={"couponRed.png"} data={"Coupons Expired"} number={userDetails.old_coupons.length}/>
                  </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default UserOverview;