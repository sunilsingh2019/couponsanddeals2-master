import React, { Component } from 'react';
import style from './getAlerts.css';

class Search extends Component {
    render() { 
        return (  
            <React.Fragment>
            <link rel="stylesheet" type="text/css" href={style}></link>
            <div id="getAlerts">
            <div className="container">
			    <h6 className="title">subscribe For discount info</h6>
			    <p align="center">
                Subscribe to the Deals mailing list to receive updates on new coupons,
                special offers and other discount information.
                </p>
                <form action="">
                <input id="searchBottom" type="text" placeholder="Enter Your Email Here" />
                <button id="subscribe" type="submit" value="Search">Subscribe</button>
                </form>
            </div>
	        </div>
            </React.Fragment>
         );
    }
}
 
export default Search;