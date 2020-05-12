import React, { Component } from 'react';
import SimpleHeader from '../companyHeader/simpleHeader'
import StoreBigFeed from '../store/normalBigStoreFeed'
import NormalBigStoreFeed from '../store/normalBigStoreFeed';

class FollowedStores extends Component {
    render() { 
        const {stores}=this.props
        return ( 
            <React.Fragment>
                <div className="row">
                  <div className="col-lg-3 col-md-0"/>
                  <div className="col-lg-9 col-md-12"><SimpleHeader title={"Stores"}/></div>
                </div>

                <NormalBigStoreFeed stores={stores}/>
                
            </React.Fragment>
         );
    }
}
 
export default FollowedStores;