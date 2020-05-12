import React, { Component } from 'react';
import Spinner from './spinner'

class OfferLoading extends Component {
    render() { 
        const array=[1,2,3,4]
        return ( 
            <React.Fragment>
                <div className="offerLoading" id="offerDiv">
					<h6 className="title">popular offers of the day</h6>
						<div className="row">
							{array.map((i)=>(
								<div key={i} className="col-md-3 col-sm-6 col-6">
									<div id="offer">
      	                                <div id="imageDiv">
									    <Spinner/>
      	                                </div>
      	      	                	</div>
								</div>
							))}
						</div>
				</div>
            </React.Fragment>
         );
    }
}
 
export default OfferLoading;