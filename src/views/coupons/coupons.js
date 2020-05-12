import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';

import { getAllCoupons, getTrendingCoupons, getFeaturedCoupons } from '../../actions/couponAction';

import style from './coupons.css';
 
import CouponFeed4 from '../../components/coupon/couponFeed4'; 
import AboutCoupon from '../../components/about/aboutCoupon'
import SliderCouponFeed from '../../components/OnSLider/SliderCouponFeed'
import SimpleHeader from '../../components/companyHeader/simpleHeader'
import CouponsLoading from '../../components/spinner/couponsLoading4'

class CouponsPage extends Component {
	componentDidMount() {
        document.title="Deals | Coupons"
        this.props.getAllCoupons(); 
        this.props.getTrendingCoupons();
        this.props.getFeaturedCoupons();
	}

    render() { 
        
        const { allCoupons,couponsLoading, trendingCoupons, featuredCoupons } = this.props.coupons; 
        let allCouponsContent, trendingCouponsContent, featuredCouponsContent;

        if (isEmpty(allCoupons || couponsLoading)) {
            allCouponsContent=<CouponsLoading/>
        } else { 
            allCouponsContent=
            <CouponFeed4 coupons={allCoupons.data}/>
        }

        if (isEmpty(trendingCoupons || couponsLoading)) {
            trendingCouponsContent=<CouponsLoading/>
        } else { 
            trendingCouponsContent=
            <SliderCouponFeed coupons={trendingCoupons.data}/>
        }

        if (isEmpty(featuredCoupons || couponsLoading)) {
            featuredCouponsContent=<CouponsLoading/>
        } else { 
            featuredCouponsContent=
            <CouponFeed4 coupons={featuredCoupons.data}/>
        }

        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="text/css" href={style}/>
                <div id="couponsPage">
                    <div className="container">
                    <SimpleHeader title={"Featured Coupons"}/>
                        <div className="couponFeed4" id="featuredCoupons">
                            {featuredCouponsContent}
                        </div>

                        <div id="flowerBg">
                            <p id="todaysTrendingText">Todays Trending Coupons</p>
                            <div className="couponFeed4" id="trendingCoupons">
                                {trendingCouponsContent}
                            </div>
                        </div>

                        <div id="couponsOfTheDay">
                            <SimpleHeader title={"Coupons Of The Day"}/>
                            {allCouponsContent}
                        </div>
                    </div> {/* end of container */}
                </div> 
            <AboutCoupon/>
            </React.Fragment>
         );
    }
}
 
CouponsPage.propTypes = {
    getAllCoupons: PropTypes.func.isRequired,
    getTrendingCoupons: PropTypes.func.isRequired,
    getFeaturedCoupons: PropTypes.func.isRequired,
	coupons: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	coupons: state.coupons
});

export default connect(
	mapStateToProps,
	{ getAllCoupons, getTrendingCoupons, getFeaturedCoupons }
)(CouponsPage);