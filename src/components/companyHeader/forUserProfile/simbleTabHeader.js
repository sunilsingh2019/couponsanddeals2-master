import React, { Component } from 'react';
import style from '../couponsHeader.css'
class SimpleTabHeader extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="text/css" href={style}/>
                <div id="simpleTabHeader">
                <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation" className="active"><a href="#active" role="tab" data-toggle="tab"><div id="featuredTitle">Active {this.props.title}</div></a></li>
                  <li role="presentation"><a href="#old" role="tab" data-toggle="tab"><div id="featuredTitle">Expired {this.props.title}</div></a></li>
                </ul>
                </div>
            </React.Fragment>
         );
    }
}
 
export default SimpleTabHeader;