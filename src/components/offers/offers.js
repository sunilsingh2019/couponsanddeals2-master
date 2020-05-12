import React, { Component } from 'react';
import style from './offers.css'
import logo from '../../assets/images/stores/dz.png'
import {Link} from 'react-router-dom'

class Offer extends Component {
    render() { 
        // console.log(this.props)
        const {banner, title, slug}= this.props.offer
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="text/css" href={style}/>
                <div id="offer">
                    <div id="imageDiv">
                        <img alt="" src={banner}/>
                    </div>
                    <div id="logoStoreDiv"><img alt="" id="logoStore" src={logo}/></div>
                    <p id="offerTitle">{title}</p>
                    <Link to={"/coupons/"+slug}><div id="claimRectangle">Claim your Offer</div></Link>
                </div>
            </React.Fragment>
         ); 
    }
}
 
export default Offer;