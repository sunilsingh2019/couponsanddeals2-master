import React, { Component } from 'react';
import ItemsCarousel from 'react-items-carousel';
import CouponNew from '../coupon/couponNew'

class FeaturedDealsFeed extends Component {

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
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions.bind(this));
    }
    
    componentWillMount() {
		this.setState({
			children: [],
			activeItemIndex: 0,
		});

		setTimeout(() => {
			this.setState({
				children: this.createChildren(),
			});
		}, 100);
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
							outsideChevron={false}
						>
							{children}
						</ItemsCarousel>
            </React.Fragment>
         );
    }
}
 
export default FeaturedDealsFeed;