import React, { Component } from 'react';
import Spinner from './spinner'

class DealsLoading extends Component {
    render() { 
        const array=[1,2,3,4]
        return ( 
            <div className="row">
				{array.map(deal => (
					<div className="col-lg-3 col-md-6 col-6" key={deal}>
						<div id="dealItemPage" className="card">
                            <Spinner/>
                        </div>
					</div>
				))} 
			</div>
         );
    }
}
 
export default DealsLoading
