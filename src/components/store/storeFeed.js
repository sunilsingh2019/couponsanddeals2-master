import React, { Component } from 'react';
import Store from './storeSmall';

class StoreFeed extends Component {
    render() { 
        const {store}=this.props
        return ( 
            <React.Fragment>
                {/* <div id="greyBG"> */}
                <div className="row">
                    {store.map(store => (
				    	<div key={store.id} className="col-md-3 col-sm-6 col-6">
                        <div key={store.id}>
                            <Store key={store.id} store={store}/>
                        </div>
                    </div>
                    ))}
				</div>
                {/* </div> */}
            </React.Fragment>
         );
    }
}
 
export default StoreFeed;