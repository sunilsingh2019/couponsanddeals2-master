import React, { Component } from 'react';

class StoreHederTab extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div id="storeOverviewTab">
                <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation" className="active"><a href="#overwiew" role="tab" data-toggle="tab"><div id="featuredTitle">Overview</div></a></li>
                  <li role="presentation"><a href="#details" role="tab" data-toggle="tab"><div id="featuredTitle">Details {this.props.title}</div></a></li>
                </ul>
                </div>
            </React.Fragment>
         );
    }
}
 
export default StoreHederTab;