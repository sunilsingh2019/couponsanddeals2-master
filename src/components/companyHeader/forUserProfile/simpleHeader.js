import React, { Component } from 'react';
import style from '../couponsHeader.css'

class SimpleHeader extends Component {
    render() { 
        const {data}=this.props
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="text/css" href={style}/>
                <div id="userHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-0"></div>
                            <div className="col-lg-9 col-md-12">
                                <div id="left">
                                    <h1>Hello, {data.name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default SimpleHeader;