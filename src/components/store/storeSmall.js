import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class StoreSmall extends Component {
    state = {  }
    render() { 
        const {store}=this.props
        return ( 
            <React.Fragment>
                <Link to={"/store/"+store.slug}>
                    <div id="smallStore">
                        <img src={store.logo} alt=""/>
                    </div>
                </Link>
            </React.Fragment>
         );
    }
}
 
export default StoreSmall;