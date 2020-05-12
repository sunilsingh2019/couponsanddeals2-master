import React, { Component } from 'react';
import BigStore from './storeBig'

class NormalBigStoreFeed extends Component {
    render() { 
        const {stores}=this.props
        // console.log(this.props)
        return ( 
            <React.Fragment>
                <div className="row">
                    {stores.map((store,index)=>(
                        <div key={store.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                            <BigStore index={index} key={store.id} store={store}/>
                        </div>
                    ))} 
                </div>
            </React.Fragment>
         );
    }
}
 
export default NormalBigStoreFeed;