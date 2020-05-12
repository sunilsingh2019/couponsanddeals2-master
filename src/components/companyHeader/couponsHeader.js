import React, { Component } from 'react';
import style from './couponsHeader.css';
import logo from '../../assets/images/coupon/coupon1.png'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CouponsHeader extends Component {
    state = {  }
    render() { 
        const {header} = this.props
        return ( 
            <React.Fragment>
            <link rel="stylesheet" type="text/css" href={style}></link>
            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous"></link> */}
            
            <div className="top couponsPage" id="allCouponHeader"> 
                <div className="container">
                     <div className="logo">
                        <img alt="" id="logo" src={header.logo}/>
                     </div>
                    
                    <div className="title">
                        {/* <div className="rating"><fieldset className="rating">
                            <input type="radio" id="star5" name="rating" value="5" /><label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                            <input type="radio" id="star4half" name="rating" value="4 and a half" /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                            <input type="radio" id="star4" name="rating" value="4" /><label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                            <input type="radio" id="star3half" name="rating" value="3 and a half" /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                            <input type="radio" id="star3" name="rating" value="3" /><label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                            <input type="radio" id="star2half" name="rating" value="2 and a half" /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                            <input type="radio" id="star2" name="rating" value="2" /><label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                            <input type="radio" id="star1half" name="rating" value="1 and a half" /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                            <input type="radio" id="star1" name="rating" value="1" /><label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                            <input type="radio" id="starhalf" name="rating" value="half" /><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                            </fieldset>
                            <p>Rated {this.props.header.rated}/5 ,  Out of {this.props.header.totalVotes} Votes</p>
                        </div> */}
                                
                            <h3>{header.name}</h3>
                            <p>{header.address}</p>
                            <p>{header.contact_number}</p>
                            <span>{this.props.header.coupons} Coupons & Offers&nbsp; | &nbsp;
                            <FontAwesomeIcon icon={faCheckCircle} id="tick" /> {this.props.header.verified} Verified &nbsp;|&nbsp; 
                            {this.props.header.usedToday} Uses Today</span>
                                

                    </div>
                </div>
            </div>
            </React.Fragment>
         );
    }
}
 
export default CouponsHeader;