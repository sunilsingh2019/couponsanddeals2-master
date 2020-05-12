import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import {CheckLoggedIn} from '../../components/common/checkLoggedIn'
import { Link } from 'react-router-dom';

import { getFeaturedStores } from '../../actions/storeActions';
import { getTrendingDeals, getDealsOfTheDay, getMixedDeals } from '../../actions/dealActions';
import { getOffersHome, getMixedCouponsHome } from '../../actions/couponAction';
import { getFeaturedPromotions } from '../../actions/promotionsActions';
import {getRelatedOffers} from '../../actions/userAction'
import { getAllCategories } from '../../actions/categoryActions';

import StoreFeed from '../../components/store/storeFeed';
import DealFeed from '../../components/deal/dealFeed';
// import CouponFeed from '../../components/coupon/couponFeedSlider6';

import OfferFeed from '../../components/offers/offerFeed';
import CarouselClass from '../../components/carousel/carousel';
import DealsOfTheDayFeed from '../../components/dealsOfTheDay/dealsOfTheDayFeed';
import BigStore from '../../components/store/storeBig';
import BigDeal from '../../components/deal/bigDeal';
import DealSlider from '../../components/deal/dealSlider'

import Spinner from '../../components/spinner/spinner';
import CouponsLoading from '../../components/spinner/couponsLoading';

import style from './home.css';
import OfferLoading from '../../components/spinner/offerLoading';
import DealsOfDayLoading from '../../components/spinner/dealsOfDayLoading';
import DealsLoading from '../../components/spinner/dealsLoading';

import Paganation from '../../components/common/paganationArrow';
import RelatedOffersFeed from '../../components/relatedOffers/relatedOffersFeed';

import CategoriesFeed from '../../components/categoryBox/categoryBoxFeed'
import CategoriesLoading from '../../components/spinner/categoriesLoading';

class Home extends Component {
	state = {
		pageSize: 8,
		currentPage: 1,
	};

	handlePageUp = (page, count) => {
		if (page + 1 > count) return;
		this.setState({ currentPage: page + 1 });
	};
	handlePageDown = (page, count) => {
		if (page - 1 < 1) return;
		this.setState({ currentPage: page - 1 });
	};
	paginate = (items, pageNumber, pageSize) => {
		const startIndex = (pageNumber - 1) * pageSize;
		return items.slice(startIndex, startIndex + pageSize);
	};

	componentDidMount() {
		document.title = 'Deals | Home';
		this.props.getFeaturedStores();
		this.props.getTrendingDeals();
		this.props.getDealsOfTheDay();
		this.props.getFeaturedPromotions();
		this.props.getOffersHome();
		this.props.getMixedCouponsHome();
		this.props.getRelatedOffers();
		this.props.getAllCategories();
		this.props.getMixedDeals()

		this.interval = setInterval(() => this.autoChange(), 5000);
	}
	
	componentWillUnmount() {
	clearInterval(this.interval);
	}

	autoChange(){
		if (this.props.stores.featuredStores.status===true){
			var pageCount=Math.ceil(this.props.stores.featuredStores.data.length/this.state.pageSize)
			const {currentPage}=this.state
			if (!isEmpty(this.props.stores.featuredStores)){
				if (Number(currentPage) + 1 > pageCount){
					this.setState({ currentPage: 1 })
				}else{
					this.setState({currentPage:Number(currentPage) + 1})
				}		
			}else{
				this.setState({ currentPage: Number(currentPage) + 1 })
			}
		}
	}

	render() {
		//for store
		const { featuredStores, storesLoading } = this.props.stores;
		let featuredStoresContent, bigStoreContent, displayPaganation, storesContent
		if (isEmpty(featuredStores) || storesLoading) {
			featuredStoresContent = <Spinner />;
			bigStoreContent = <Spinner />;
			storesContent=
			<div className="storeDivHome">
				<div id="today">
					<h5 className="title">Popular Stores</h5>
				</div>
				<div className="row">
					<div className="col-md-3 col-sm-12" id="noPadding">
						{bigStoreContent}
					</div>
					<div className="col-md-9 col-sm-12" id="greyBG">
						{featuredStoresContent}
					</div>
				</div>
			</div>
		} else {
			if (featuredStores.status===true)
			displayPaganation = (
				<Paganation
					itemsCount={featuredStores.data.length}
					pageSize={this.state.pageSize}
					onPageUp={this.handlePageUp}
					onPageDown={this.handlePageDown}
					currentPage={this.state.currentPage}
				/>
			);

			
			if (featuredStores.status===true){
				featuredStoresContent = <StoreFeed store={this.paginate(featuredStores.data, this.state.currentPage, this.state.pageSize)} />
				bigStoreContent = <BigStore store={featuredStores.top_store} />;
				
				storesContent=
				<div className="storeDivHome">
					<div id="today">
						<h5 className="title">Popular Stores</h5>
						{displayPaganation}
					</div>
					<div className="row">
						<div className="col-md-3 col-sm-12" id="noPadding">
							{bigStoreContent}
						</div>
						<div className="col-md-9 col-sm-12" id="greyBG">
							{featuredStoresContent}
						</div>
					</div>
				</div>
			}
		}


		//for coupons
		const { couponsLoading, offersHome, mixedCouponsHome } = this.props.coupons;
		let offersContent, mixedCouponsContent;

		if (isEmpty(offersHome) || couponsLoading) {
			offersContent = <OfferLoading />;
		} else {
			if (offersHome.status===true){
				offersContent = <OfferFeed offers={offersHome.data} />;
			}
		}

		// if (isEmpty(mixedCouponsHome) || couponsLoading) {
		// 	mixedCouponsContent = (
		// 		<div className="tab-content">
		// 			<div role="tabpanel" className="tab-pane active" id="mostUsed">
		// 				<CouponsLoading />
		// 			</div>
		// 			<div role="tabpanel" className="tab-pane" id="latest">
		// 				<CouponsLoading />
		// 			</div>
		// 			<div role="tabpanel" className="tab-pane" id="food">
		// 				<CouponsLoading />
		// 			</div>
		// 			<div role="tabpanel" className="tab-pane" id="travel">
		// 				<CouponsLoading />
		// 			</div>
		// 			<div role="tabpanel" className="tab-pane" id="fashion">
		// 				<CouponsLoading />
		// 			</div>
		// 		</div>
		// 	);
		// } else {
		// 	mixedCouponsContent = (
		// 		<div className="tab-content">
		// 			<div role="tabpanel" className="tab-pane active" id="mostUsed">
		// 				<CouponFeed coupons={mixedCouponsHome.popular} />
		// 			</div>
		// 			<div role="tabpanel" className="tab-pane" id="latest">
		// 				<CouponFeed coupons={mixedCouponsHome.latest} />
		// 			</div>
		// 			<div role="tabpanel" className="tab-pane" id="food">
		// 				<CouponFeed coupons={mixedCouponsHome.food} /> 
		// 			</div>
		// 			<div role="tabpanel" className="tab-pane" id="travel">
		// 				<CouponFeed coupons={mixedCouponsHome.travel} />
		// 			</div>
		// 			<div role="tabpanel" className="tab-pane" id="fashion">
		// 				<CouponFeed coupons={mixedCouponsHome.fashion} />
		// 			</div>
		// 		</div>
		// 	);
		// }

		//for deals
		const { loading, trendingDeals, dealsOfTheDay, mixedDeals } = this.props.deals;
		let trendingDealsContent, dealsOfTheDayContent, mixedDealsContent;
		if (isEmpty(trendingDeals) || loading) {
			trendingDealsContent = <DealsLoading />;
		} else {
			trendingDealsContent = <DealFeed deals={trendingDeals.data.slice(0, 8)} />;
		}
		if (isEmpty(dealsOfTheDay) || loading) {
			dealsOfTheDayContent = <DealsOfDayLoading />;
		} else {
			dealsOfTheDayContent = <DealsOfTheDayFeed deals={dealsOfTheDay.data} />;
		}
		if(isEmpty(mixedDeals) || loading){
				mixedDealsContent = (
				<div className="tab-content">
					<div role="tabpanel" className="tab-pane active" id="mostUsed">
						<CouponsLoading />
					</div>
					<div role="tabpanel" className="tab-pane" id="latest">
						<CouponsLoading />
					</div>
					<div role="tabpanel" className="tab-pane" id="food">
						<CouponsLoading />
					</div>
					<div role="tabpanel" className="tab-pane" id="travel">
						<CouponsLoading />
					</div>
					<div role="tabpanel" className="tab-pane" id="fashion">
						<CouponsLoading />
					</div>
				</div>
			);
		} else {
			mixedDealsContent = (
				<div className="tab-content">
					<div role="tabpanel" className="tab-pane active" id="popular">
						<DealSlider deals={mixedDeals.popular} />
					</div>
					<div role="tabpanel" className="tab-pane" id="latest">
						<DealSlider deals={mixedDeals.latest} />
					</div>
					<div role="tabpanel" className="tab-pane" id="food">
						<DealSlider deals={mixedDeals.food} /> 
					</div>
					<div role="tabpanel" className="tab-pane" id="travel">
						<DealSlider deals={mixedDeals.travel} />
					</div>
					<div role="tabpanel" className="tab-pane" id="fashion">
						<DealSlider deals={mixedDeals.fashion} />
					</div>
				</div>
			);
		}


		//for categories
		const {categories, categoriesLoading} = this.props.categories
		let categoriesContent
		if (isEmpty(categories) || categoriesLoading){
			categoriesContent=<CategoriesLoading/>
		}else{
			categoriesContent=<CategoriesFeed followedCategories={categories.data.slice(0, 12)}/>
		}

		//for promotions
		const { promotionsLoading, featuredPromotions } = this.props.promotions;
		let featuredPromotionsContent;
		if (isEmpty(featuredPromotions) || promotionsLoading) {
			featuredPromotionsContent = <Spinner />;
		} else {
			featuredPromotionsContent = (
				<div id="carouselContainer">
					<CarouselClass promotions={featuredPromotions.data} />
				</div>
			);
		}

		//for related offers
		let relatedOffersContent;
		if (CheckLoggedIn()){
			const {userLoading, relatedOffers}=this.props.user
			if (isEmpty(relatedOffers) || userLoading){
				relatedOffersContent=
				<div id="relatedOffersDiv">
					<h5 className="title">Just for you</h5>
					<CouponsLoading/>
				</div>
			}else{
				if (isEmpty(this.props.user.relatedOffers.data)) {
					relatedOffersContent=" "
				}else{
				relatedOffersContent=
				<div id="relatedOffersDiv"> 
					<h5 className="title">Just for you</h5>
					<RelatedOffersFeed offers={this.props.user.relatedOffers.data.slice(0,8)}/>
					<Link to="/offers-just-for-you">
						<div id="viewAllDeals">View All Offers</div>
					</Link>
				</div>
				}
			}
		}
		return (
			<React.Fragment>
				<link rel="stylesheet" type="text/css" href={style} />
				<div id="homePage">
					<div className="container">
						<div className="row">
							<div className="col-md-8 col-sm-12">{featuredPromotionsContent}</div>
							<div className="col-md-4 col-sm-12">{dealsOfTheDayContent}</div>
						</div>
						{/*..................carousel and sidebox ends..... */}

						{/* ..................popular offers of the day................. */}
						{offersContent}

						{/* ----------popular stores-------- */}
						{storesContent}

						{/* mixed category coupons starts */}
						{/* <div id="couponsDiv">
							<h5 className="title">today's top coupons and offer</h5>
							<ul className="nav nav-tabs">
								<li className="nav-item">
									<a className="nav-link active" role="tab" data-toggle="tab" href="#mostUsed">
										MOST USED
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" role="tab" data-toggle="tab" href="#latest">
										LATEST
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" role="tab" data-toggle="tab" href="#food">
										FOOD
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" role="tab" data-toggle="tab" href="#travel">
										TRAVEL
									</a>
								</li>
								<li className="nav-item">
									<Link id="showAllHome" className="nav-link" to="/coupons">
										Show All
									</Link>
								</li>
							</ul>
							{mixedCouponsContent}
						</div> */}
						
						{/* deals content starts */}
						<div id="dealsOfTheDayDiv">
							<h5 className="title">deals of the day</h5>
							{trendingDealsContent}
							<Link to="/deals">
								<div id="viewAllDeals">View All Deals</div>
							</Link>
						</div>{' '}
						{/* deals of the ends */}
						{/* related offers Starts */}

						{/* for mixed deals */}
						<div id="mixedDealsDiv">
						<div id="couponsDiv">
							<h5 className="title">today's top deals</h5>
							<ul className="nav nav-tabs">
								<li className="nav-item">
									<a className="nav-link active" role="tab" data-toggle="tab" href="#popular">
										POPULAR
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" role="tab" data-toggle="tab" href="#latest">
										LATEST
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" role="tab" data-toggle="tab" href="#food">
										FOOD
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" role="tab" data-toggle="tab" href="#fashion">
										FASHION
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" role="tab" data-toggle="tab" href="#travel">
										TRAVEL
									</a>
								</li>
								<li className="nav-item">
									<Link id="showAllHome" className="nav-link" to="/deals">
										Show All
									</Link>
								</li>
							</ul>
							{mixedDealsContent}
						</div>
						</div>
						
						{/* categoriesss */}
						<div id="categoriesHome">
							<h5 className="title">favourite categories</h5>
							{categoriesContent}
						</div>
						
						{relatedOffersContent}

						{/* deals collections starts */}
						<div id="dealsCollectionDiv">
							<h5 className="title">deals collections</h5>
							<div className="row">
								<div className="col-lg-6 col-md-12">
									<BigDeal />
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Home.propTypes = {
	getFeaturedStores: PropTypes.func.isRequired,
	getFeaturedPromotions: PropTypes.func.isRequired,
	getDealsOfTheDay: PropTypes.func.isRequired,
	getOffersHome: PropTypes.func.isRequired,
	getMixedCouponsHome: PropTypes.func.isRequired,
	getRelatedOffers:PropTypes.func.isRequired,
	getAllCategories:PropTypes.func.isRequired,
	getMixedDeals:PropTypes.func.isRequired,

	stores: PropTypes.object.isRequired,
	deals: PropTypes.object.isRequired,
	promotions: PropTypes.object.isRequired,
	coupons: PropTypes.object.isRequired,
	user:PropTypes.object.isRequired,
	categories:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	stores: state.stores,
	deals: state.deals,
	coupons: state.coupons,
	promotions: state.promotions,
	user:state.user,
	categories: state.categories
});

export default connect(
	mapStateToProps,
	{ getFeaturedStores, getMixedCouponsHome, getMixedDeals, getOffersHome, getRelatedOffers, getTrendingDeals, getDealsOfTheDay, 
		getFeaturedPromotions, getAllCategories }
)(Home);
