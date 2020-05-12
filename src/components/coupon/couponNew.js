import React, { Component } from 'react';
import logo from '../../assets/images/stores/dz.png';
import {Link} from 'react-router-dom'
import style from './coupon.css'

class CouponNew extends Component {
    render() { 
        const {details, banner, offer_title, slug, store, title}=this.props.coupon
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="css" href={style}/>
                <Link to={"/coupons/"+slug}>
                <div id="newCoupon">
                    <div id="logoDiv">
                        <img src={logo} alt=""/>
                    </div>
                    <div id="offerOff">
                        <h3>{title}</h3> 
                        {offer_title}
                    </div>
                    <div id="offerDes">
                    {store}
                    </div>
                    <div id="seeOthers">
                    See All Offers
                    </div>
                </div>
                </Link>
            </React.Fragment>
         );
    }
}
 
export default CouponNew;