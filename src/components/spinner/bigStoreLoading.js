import React, { Component } from 'react';
import Spinner from './spinner';

class BigStoreLoading extends Component {
    render() { 
        const array=[0,1,2,3]
        return ( 
            <div className="row">
                {array.map((i)=>(
                    <div className="col-md-3 col-sm-6 col-6" key={i}>
                        <div id="bigStore">
                            <Spinner/>
                        </div>
                    </div>
                ))}
            </div>
         );
    }
}
 
export default BigStoreLoading;