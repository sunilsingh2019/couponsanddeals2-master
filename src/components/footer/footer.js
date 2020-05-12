import React, { Component } from 'react';
import style from './footer.css';
import { faMapMarkerAlt, faEnvelopeOpen, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Search from '../../components/getAlerts/getAlerts'
import visa from '../../assets/images/logos/visa.png'
import master from '../../assets/images/logos/mastercard-logo-png-transparent.png';

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
            <link rel="stylesheet" type="text/css" href={style}></link>
            <Search/>
            
            <div id="footer">
            <div className="container">
                <div id="footer1">
                    <div className="row">
                        <div className="col-md-5 col-sm-12">
                            <div id="logoDiv">DEAL</div>
                            <p>
                                Deal is a time saving site to offer you various
                                deals and coupons triving ttowards making the world better
                                place to shop with great savings!:)
                            </p>
                            <h6><FontAwesomeIcon icon={faMapMarkerAlt} />184 Gairigaun, Tinkune 3021, Nepal</h6>
                            <h6><FontAwesomeIcon icon={faEnvelopeOpen} />contact@deal.com</h6>
                            <h6><FontAwesomeIcon icon={faPhone} />(00977)1 424345</h6>
                        </div>
                        <div className="col-md-3 col-sm-12 marginTop">
                            <h6><Link to="/">About Us</Link></h6>
                            <h6><Link to="/">Contact Us</Link></h6>
                            <h6><Link to="/">Terms and Conditions</Link></h6>
                            <h6><Link to="/">FAQ's</Link></h6>
                            <h6><Link to="/">Claiming Coupon Guide</Link></h6>
                        </div>
                        <div className="col-md-3 col-sm-12 marginTop">
                            <h6><Link to="/">Latest Deals</Link></h6>
                            <h6><Link to="/">Popular Offers of the Day</Link></h6>
                            <h6><Link to="/">Today's top coupons and deals</Link></h6>
                            <h6><Link to="/">Top Brands</Link></h6>
                            <h6><Link to="/">Deals of the Day</Link></h6>
                            <h6><Link to="/">Deals Collection</Link></h6>
                        </div>
                    </div>
                </div> {/* footer1 ends */}
                </div>

                <div id="footer2">
                <div className="container">
                <div className="row">
                    <div className="col-md-5 col-sm-12">
                        &copy; 2020 Deal. All Rights Reserved. 
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <img className="cardPic" src={master} alt=""/>
                        <img className="cardPic" src={visa} alt=""/>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faTwitter} />
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                </div>
                </div>
                </div>
            </div>
            </React.Fragment>
         );
    }
}
 
export default Footer;