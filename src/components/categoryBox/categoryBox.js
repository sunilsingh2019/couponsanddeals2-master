import React, { Component } from 'react';
import style from './categoryBox.css'

class CategoryBox extends Component {
    render() { 
        const {name, image}=this.props.cat
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="css" href={style}/>
                <div id="categoryBox1">
                    <div className="store">
                        <div className="shopImgDiv">
                            <img alt="" className="shopImg" src={image}/>
                        </div>
                        <div className="shopDesDiv">
                            <h6 id="shopName">{name}</h6>
                            {/* <span className="shopButton"> Coupons |  Offers Available</span> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default CategoryBox;
