import React, { Component } from 'react';
import DealsBox from './dealsBox'

class DealsOfTheDayFeed extends Component {

    render() { 
        return ( 
            <React.Fragment>
                <div className="boxCar">
					<div id="allDeals">
						<div id="fixedBox">
							LATEST DEALS
						</div>
						<div id="dealsBox">
							{this.props.deals.map((deals,index) => (
								<DealsBox key={index} deals={deals} />
							))}
						</div>
					</div>
				</div>
            </React.Fragment>
         );
    }
}
 
export default DealsOfTheDayFeed;