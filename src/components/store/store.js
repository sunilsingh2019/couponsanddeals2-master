import React, { Component } from 'react';
import style from './store.css';
import { Link } from 'react-router-dom';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Store extends Component {
    render() { 
        // console.log(this.props.store)
        const {id, logo, name, slug, city}=this.props.store
        return ( 
            <React.Fragment>
                <link rel="stylesheet" type="text/css" href={style}></link>
                <Link to={`/store/${slug}`}>
                <div className="store">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-12">
                                <div className="shopImgDiv">
                                    <span className="helper"></span>
                                    <img alt="" className="shopImg" src={logo}/>
                                </div>
                            </div>

                            <div id="someName" className="col-md-5 col-sm-12">
                                <div id="info">
                                    <h2>{name}</h2>
                                    <h3>Electronics, Fashion, Sports</h3>
                                    <p><FontAwesomeIcon icon={faMapMarkerAlt}/> {city}</p>
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-12" id="rightSide">
                                <div id="open">Open</div>
                                <div id="couponQuantity">50 Coupons | 23 Offers</div>
                                <div id="buttons">
                                    <div className="cardButton">Credit Card</div>
                                    <div className="cardButton">Cash on Pickup</div>
                                    <div className="cardButton">Cash on Delivery</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
            </React.Fragment>
         );
    }
}
 
export default Store;