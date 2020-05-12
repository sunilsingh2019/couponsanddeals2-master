import React, { Component } from 'react';
import SimpleHeader from '../companyHeader/simpleHeader'

class ClaimedDeals extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="row">
                  <div className="col-md-3 col-sm-0"/>
                  <div className="col-md-9 col-sm-12"><SimpleHeader title={"Deals"}/></div>
                </div>
         );
    }
}
 
export default ClaimedDeals;