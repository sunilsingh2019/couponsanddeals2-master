import React, { Component } from 'react';
import style from './couponDescription.css'
import { faCheckCircle, faCircle, faCommentDots, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

class CouponDescription extends Component {
    render() { 
        const {coupon}=this.props
        return ( 
            <React.Fragment>
                <link rel="stylesheet" type="text/css" href={style}/>
                <div className="block couponDes">
                <div className="container">
                <div className="row">
                <div className="col-md-7 col-sm-12">
                    <h3>{coupon.title}</h3>
					<p id="bigp">{coupon.details}</p>
                </div>
                <div className="col-md-5 col-sm-12">
                    <div id="right">
                    <p><FontAwesomeIcon id="tick" icon={faCheckCircle} /> 
                    {} Verified&nbsp;&nbsp;
					<FontAwesomeIcon className="small" icon={faCircle} /> &nbsp;&nbsp;
                     {} Uses Today</p>
					<a href="" className="button">{}<span>Copy and visit site</span></a>
                    </div>
                </div>
                 </div> {/*......end of row */}
				<hr />
				<p className="valid">
                    <Link to={"/coupons/"+coupon.slug}>Show Details</Link> &nbsp;&nbsp;
                    <FontAwesomeIcon className="small" icon={faCircle} />
				    &nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCommentDots} />&nbsp;&nbsp;
                    Comment({})
                    &nbsp;&nbsp;
                    <FontAwesomeIcon className="small" icon={faCircle} />
                    &nbsp;&nbsp;
                    <FontAwesomeIcon icon={faClock} /> &nbsp;&nbsp;
                    Valid till {}
				</p>
                </div>
				</div>
            </React.Fragment>
         );
    }
}
 
export default CouponDescription;