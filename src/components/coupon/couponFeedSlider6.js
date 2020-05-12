import React, { Component } from 'react';
import CouponNew from './couponNew';
import ItemsCarousel from 'react-items-carousel';

class CouponFeedSlider6 extends Component {
	_isMounted = false;
	updateDimensions() {
		if (window.innerWidth < 450) {
			return 1;
		}
		if (window.innerWidth < 600) {
			return 2;
		}
		if (window.innerWidth < 800) {
			return 3;
		}
		if (window.innerWidth < 1100) {
			return 4;
		}
		if (window.innerWidth < 1200) {
			return 5;
		}
		return 6;
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

	createChildren = () => this.props.coupons.map(coupon => <CouponNew key={coupon.id} coupon={coupon} />);

	changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });

	render() {
		const { activeItemIndex, children } = this.state;
		return (
			<React.Fragment>
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
			</React.Fragment>
		);
	}
}

export default CouponFeedSlider6;
