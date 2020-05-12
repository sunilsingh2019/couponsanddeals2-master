import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DealItem from './dealItem';

class DealFeed3 extends Component {
	render() {
		const { deals } = this.props;
		return (
			<div className="row"> 
				{deals.map((deal,i) => (
					<div className="col-md-4 col-sm-6 col-xs-6 col-6" key={i}>
						<DealItem
							key={deal.id}
							deal={deal.title}
							slug={deal.slug}
							image={deal.banner}
							price={deal.sell_price}
							oldPrice={deal.actual_price}
							description={deal.details}
							offPercentage={deal.off_percentage}
							store={deal.store}
						/>
					</div>
				))} 
			</div>
		);
	}
}

DealFeed3.propTypes = {
	deals: PropTypes.array.isRequired,
};

export default DealFeed3;
