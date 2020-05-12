import React, { Component } from 'react';

class SimpleHeader extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div id="simpleHeader">
                    <div id="featuredTitle">{this.props.title}</div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default SimpleHeader;