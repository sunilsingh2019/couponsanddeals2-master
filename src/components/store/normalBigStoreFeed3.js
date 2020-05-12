import React, { Component } from 'react';
import BigStore from './storeBig'

class NormalBigStoreFeed3 extends Component {
    render() { 
        const {stores}=this.props
        // console.log(this.props)
        return ( 
            <React.Fragment>
                <div className="row">
                    {stores.map((store,index)=>(
                        <div key={store.id} className="col-lg-4 col-md-6 col-sm-12">
                            <BigStore index={index} key={store.id} store={store}/>
                        </div>
                    ))} 
                </div>
            </React.Fragment>
         );
    }
}
 
export default NormalBigStoreFeed3;