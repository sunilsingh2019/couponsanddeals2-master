import React, { Component } from 'react';
import Store from './storeBig';

import ItemsCarousel from 'react-items-carousel';

class BigStoreFeed extends Component {
	constructor (){
		super();
		this._isMounted = false;
		this.updateDimensions = this.updateDimensions.bind(this);
	}
	updateDimensions() {
		if (window.innerWidth < 450) {
			return 1;
		}
		if (window.innerWidth < 776) {
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
			window.addEventListener('resize', this.updateDimensions);
		}
	}

	componentWillMount() {
		this.setState({
			children: [],
			activeItemIndex: 0,
		});

		setTimeout(() => {
			if (this._isMounted) {
				this.setState({
					children: this.createChildren(),
				});
			}
		}, 100);
	}

	componentWillUnmount() {
		this._isMounted = false;
		window.removeEventListener('resize', this.updateDimensions);
	}

	createChildren = () => this.props.store.map((store, index) => <Store index={index} key={store.id} store={store} />);

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

export default BigStoreFeed;
