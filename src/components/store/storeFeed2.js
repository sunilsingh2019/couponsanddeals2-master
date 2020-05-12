import React, { Component } from 'react';
import Store from './store';

class StoreFeed2 extends Component { 
    state = {  }
    render() { 
        let sortBy=this.props.sort
        const {store}=this.props
        let sortedContent

        if (sortBy==='z2a'){
            sortedContent=
            <React.Fragment>
                {store
                .sort((a, b) => b.name.localeCompare(a.name))
                .map((store,i) => (
                    <Store key={i} store={store}/>
			    ))}
			</React.Fragment>
        }else{
            sortedContent=
            <React.Fragment>
                    {store
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((store,i) => (
                        <Store key={i} store={store}/>
				    ))}
				</React.Fragment>
        }

        return ( 
            <React.Fragment>
                {sortedContent}
            </React.Fragment>
         );
    }
}
 
export default StoreFeed2;