import React, { Component } from 'react';
import Spinner from './spinner'

class DealsOfDayLoading extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="boxCar">
				<div id="allDeals">
					<div id="fixedBox">
						LATEST DEALS
					</div>
					<div id="dealsBox">
						<Spinner/>
					</div>
				</div>
			</div>
         );
    }
}
 
export default DealsOfDayLoading;