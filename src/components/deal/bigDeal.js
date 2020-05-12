import React, { Component } from 'react';
import style from './deal.css'
import {Link} from 'react-router-dom'
import bag from '../../assets/images/products/headphones.png'
class BigDeal extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="text/css" href={style}/>
                <div id="bigDeal">
                <div className="container">
                <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div id="collections">Deals collections this week</div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <Link to="/"><button id="viewAll">View All</button></Link>
                        </div>
                    </div>
                    
                    
                    <div id="imageDiv">
                    <img alt="" src={bag}/>
                    </div>
                </div>
                    
                </div>
            </React.Fragment>
         );
    }
}
 
export default BigDeal;