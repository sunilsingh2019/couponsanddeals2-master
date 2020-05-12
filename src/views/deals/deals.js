import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';

import { getTrendingDeals, getAllDeals, getFeaturedDeals } from '../../actions/dealActions';

import DealFeed from '../../components/deal/dealFeed';
import SliderDealFeed from '../../components/OnSLider/SliderDealFeed';
import AboutDeal from '../../components/about/aboutDeal';
import SimpleHeader from '../../components/companyHeader/simpleHeader';
import DealsLoading from '../../components/spinner/dealsLoading';

import './deals.css';

class Deals extends Component {
	// _isMounted = false;

	componentDidMount() {
		// this._isMounted = true;
		// if (this._isMounted) {
		this.props.getFeaturedDeals();
		this.props.getTrendingDeals();
		this.props.getAllDeals();
		// }
	}

	// componentWillUnmount() {
	// 	this._isMounted = false;
	// }

	render() {
		// console.log(this.props.deals)
		const { trendingDeals, loading, allDeals, featuredDeals } = this.props.deals;

		let trendingDealsContent, allDealsContent, featuredDealsContent;

		if (isEmpty(trendingDeals) || loading) {
			trendingDealsContent = <DealsLoading />;
		} else {
			trendingDealsContent = <SliderDealFeed deals={trendingDeals.data} />;
		}

		if (isEmpty(allDeals) || loading) {
			allDealsContent = <DealsLoading />;
		} else {
			allDealsContent = <DealFeed deals={allDeals.data} />;
		}

		if (isEmpty(featuredDeals) || loading) {
			featuredDealsContent = <DealsLoading />;
		} else {
			featuredDealsContent = <DealFeed deals={featuredDeals.data} />;
		}

		return (
			<React.Fragment>
				<div id="dealsPage">
					<div className="container">
						<SimpleHeader title={"Featured Deals"}/>
						<div id="featuredDeal">
							{featuredDealsContent}
						</div>

						<div id="flowerBg">
							<p id="todaysTrendingText">Todays Trending Deals</p>
							<div id="trendingDeal">{trendingDealsContent}</div>
						</div>

						<div id="dealsOfTheDay">
							<SimpleHeader title={'Deals Of The Day'} />
							{allDealsContent}
						</div>
					</div>
					{/* end of container */}
				</div>
				<AboutDeal />
			</React.Fragment>
		);
	}
}

Deals.propTypes = {
	getTrendingDeals: PropTypes.func.isRequired,
	deals: PropTypes.object.isRequired,
	getAllDeals: PropTypes.func.isRequired,
	getFeaturedDeals: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	deals: state.deals,
});

export default connect(
	mapStateToProps,
	{ getTrendingDeals, getAllDeals, getFeaturedDeals }
)(Deals);
