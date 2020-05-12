import React, { Component } from 'react';
import Offer from './offers';
import ItemsCarousel from 'react-items-carousel';

class OfferFeed extends Component {
	_isMounted = false;
	updateDimensions() {
		if (window.innerWidth < 626) {
			return 1;
		}
		if (window.innerWidth < 992) {
			return 2;
		}
		if (window.innerWidth < 1200) {
			return 3;
		}
		return 4;
	}

	componentDidMount() {
		this._isMounted = true;
		if (this._isMounted) {
			this.updateDimensions();
			window.addEventListener('resize', this.updateDimensions.bind(this));
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
		window.removeEventListener('resize', this.updateDimensions.bind(this));
	}

	createChildren = () => this.props.offers.map(offer => <Offer key={offer.id} offer={offer} />);

	changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });

	render() {
		// console.log(this.props)
		const { activeItemIndex, children } = this.state;
		return (
			<React.Fragment>
				<div id="offerDiv">
					<h6 className="title">popular offers of the day</h6>
					<ItemsCarousel
						// Carousel configurations
						numberOfCards={this.updateDimensions()}
						gutter={12}
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
						outsideChevron={true}
					>
						{children}
					</ItemsCarousel>
				</div>
				{/*popular offers ends  */}
			</React.Fragment>
		);
	}
}

export default OfferFeed;
