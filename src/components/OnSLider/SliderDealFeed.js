import React, { Component } from 'react';
import ItemsCarousel from 'react-items-carousel';
import DealItem from '../deal/dealItem';

class FeaturedDealsFeed extends Component {
	constructor() {
		super();
		this._isMounted = false;

		this.updateDimensions = this.updateDimensions.bind(this);
	}

	updateDimensions() {
		if (window.innerWidth < 766) {
			return 1;
		}
		if (window.innerWidth < 992) {
			return 2;
		}
		return 3;
	}

	componentDidMount() {
		this._isMounted = true;
		if (this._isMounted) {
			this.updateDimensions();
			window.addEventListener('resize', this.updateDimensions);
		}
	}

	componentWillMount() {
		this.setState({
			children: [],
			activeItemIndex: 0,
		});

		setTimeout(() => {
			this._isMounted &&
				this.setState({
					children: this.createChildren(),
				});
		}, 100);
	}

	componentWillUnmount() {
		this._isMounted = false;
		window.removeEventListener('resize', this.updateDimensions);
	}

	createChildren = () =>
		this.props.deals.map(deal => (
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
		));

	changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });

	render() {
		const { activeItemIndex, children } = this.state;
		return (
			<React.Fragment>
				<ItemsCarousel
					// Carousel configurations
					numberOfCards={this.updateDimensions()}
					gutter={1}
					showSlither={false}
					firstAndLastGutter={true}
					freeScrolling={false}
					// Active item configurations
					requestToChangeActive={this.changeActiveItem}
					activeItemIndex={activeItemIndex}
					activePosition={'center'}
					chevronWidth={24}
					rightChevron={'>'}
					leftChevron={'<'}
					outsideChevron={false}
				>
					{children}
				</ItemsCarousel>
			</React.Fragment>
		);
	}
}

export default FeaturedDealsFeed;
