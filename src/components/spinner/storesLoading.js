import React, { Component } from 'react';
import Spinner from './spinner'

class StoresLoading extends Component {
    render() { 
        const array=[0,1,2,3]
        return ( 
            <React.Fragment>
                {array.map((i)=>(
                <div key={i} className="store">
                    <div className="container">
                        <Spinner/>
                    </div>
                </div>
            ))}
            </React.Fragment>
         );
    }
}
 
export default StoresLoading;