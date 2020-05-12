import React, { Component } from 'react';
import style from './dealsBox.css'
import { Link} from 'react-router-dom';

class DealsBox extends Component {
    state = {  }
    render() { 
        const {type, banner, off_percentage,offer_title, slug, title}=this.props.deals
        let subTitle
        if (type==='deal'){
            subTitle=<div id="stealPrice">{off_percentage}% OFF!!</div>
        }else{
            subTitle=<div id="stealPrice"> {offer_title}</div>
        }
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="text/css" href={style}/>
                <Link to={"/"+type+"s/"+slug}>
                <div id="stealDeal">
                    <div id="stealDealImageDiv">
                        {/* <span className="helper"></span> */}
                        <img alt=" " src={banner} />
                    </div>
                    <div id="stealDealDes"> 
                    <p id="stitle">{title}</p>
                    {subTitle}
                    </div> 
                </div>
                </Link>
                
            </React.Fragment>
         );
    }
}
 
export default DealsBox;