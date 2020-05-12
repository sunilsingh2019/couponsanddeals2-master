import React, { Component } from 'react';
import { faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class StoreHeader extends Component {
    render() { 
        const {data, coupon, deal}=this.props
        // console.log(this.props)
        return ( 
            <React.Fragment>
                <div id="storeHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-0"></div>
                            <div className="col-md-9 col-sm-12">
                                <div id="left">
                                    <h1>{data.name}</h1>
                                    <p>
                                    {/* {coupon} Coupons &amp; */}
                                     {deal} Offers | 3151 Uses Today</p>
                                </div>

                            {data.city && (
                                <div id="right">
                                    {data.city} <FontAwesomeIcon icon={faMapMarkerAlt}/> <br/>
                                    {data.contact_number} <FontAwesomeIcon icon={faPhone}/>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default StoreHeader;