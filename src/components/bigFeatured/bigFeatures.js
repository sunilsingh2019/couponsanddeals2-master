import React, { Component } from 'react';
import img1 from '../../assets/images/featured/f1.jpg'
import style from './bigFeatured.css'
import logo from '../../assets/images/stores/amazon.PNG'

class BigFeatured extends Component {
    state = {  }
    render() { 
        const {actual_price, banner, details,off_percentage, sell_price, slug, store, title}=this.props.feat
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="text/css" href={style}/>
                <div id="bigFeatured">
                <img alt="" id="backimg" src={banner}/>
                </div>
                <div id="bigFeaturedAfter">
                    <h5>{title}</h5>
                    <p>{details}</p>
                    <div id="price">
                        <span id="actual">{actual_price}</span>
                        {sell_price}
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default BigFeatured;