import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import topimg from '../../assets/images/products/headphones.png'
import logo from '../../assets/images/stores/amazon.PNG'

class RelatedOffers extends Component {
    render() { 
        const {banner, off_percentage, offer_title, slug,store_logo, title, type}=this.props.offer
        let subtitle= type==='coupon'?offer_title: off_percentage+"% OFF!!"
        let linkText=type==='coupon'? '/coupons/'+slug : '/deals/'+slug 
        return ( 
            <React.Fragment>
                <Link to={linkText}>
                    <div id="relatedOffersBox">
                        <div id="topImageDiv">
                            <img alt="" src={banner}/>
                        </div>
                        <div id="topImageDivAfter"></div>
                        <div id="logoImgDiv">
                            <img alt="" src={store_logo}/>
                        </div>
                        <div id="bottomDiv">
                            <h3>{title}</h3>
                            <h4>{subtitle}</h4>
                        </div>
                    </div>
                </Link>
            </React.Fragment>
         );
    }
}
 
export default RelatedOffers;