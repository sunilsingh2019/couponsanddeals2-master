import React, { Component } from 'react';

import isEmpty from '../../../validation/isEmpty';
import {faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {CheckLoggedIn} from '../../../components/common/checkLoggedIn'

import style from './storeDetail.css'
import SearchSide from '../../../components/search/search'
import StoreHeader from '../../../components/companyHeader/storeHeader'
// import SimpleHeader from '../../../components/companyHeader/simpleHeader'
// import LongCouponFeed from '../../../components/coupon/longCouponFeed'
import TabHeader from '../../../components/companyHeader/tabHeader';
import DealFeed3 from '../../../components/deal/dealFeed3';
import About from '../../../components/about/aboutCoupon'
import Spinner from '../../../components/spinner/spinner';

import {storeDetailAPI, followStoreAPI} from '../../../api/apiURLs'
import axios from '../../../api/axiosInstance'

class StoreDetails extends Component {
constructor(props){
	super(props)
	this.state={
		data:{},
		allCoupons:[],
		allDeals:[],
		isLoading:true,
		dealQuery:'',
		couponQuery:'',
		currentDeal:'',
		currentCoupon:'',
		query:'',
		filteredCouponContent:[],
		filteredDealContent:[],
		searchQuery:'',
		slug:this.props.match.params.slug,
		loadmore:false
	}
}

getStoreDetail=(doSearch)=>{
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`, 
	};

	let oldCoupons=[...this.state.allCoupons]
	let oldDeals=[...this.state.allDeals]
	let oldCouponPage=this.state.currentCoupon
	let oldDealPage=this.state.currentDeal
	let search

	if (doSearch){
		search=this.state.slug+"?search_term="+this.state.searchQuery
	}else{
		search=this.state.slug+'?deal_page='+this.state.dealQuery+'&coupon_page='+this.state.couponQuery
	}

	axios 
		.get(storeDetailAPI(search), { headers: { ...headers } })
		.then(response => {
			if (response.data.status===false){
				this.props.history.push('/not-found');
				return
			}
			this.setState(() => ({
				data: response.data,
				isLoading:false,
				loadmore:false,
				currentCoupon:response.data.coupons.pagination.page,
				currentDeal:response.data.deals.pagination.page,
			}));

			if(oldCouponPage!==response.data.coupons.pagination.page){
				this.setState(()=>({
					allCoupons:[...oldCoupons, ...response.data.coupons.data]
				}))
			}
			if (oldDealPage !==response.data.deals.pagination.page){
				this.setState(()=>({
					allDeals:[...oldDeals, ...response.data.deals.data]
				}))
			}
			if(doSearch){
				this.setState({
					allDeals:response.data.deals.data,
					allCoupons:response.data.coupons.data
				})
			}
		})
		.catch(error => {
			console.log(error);
		});
}

followStore=()=>{
	var bodyFormData = new FormData();
	bodyFormData.set('store_slug', this.state.slug);
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`, 
	};
	axios({ 
		method:'post',
		url:followStoreAPI,
		data: bodyFormData, 
		headers:{...headers}
	})
	.then(response => {
		console.log(response.data);
		this.getStoreDetail();
	})
	.catch(error => {
		console.log(error);
	});	
};

handleFollowStore=(e)=>{
	e.preventDefault();
	this.followStore();
}

 componentDidMount() {
	document.title="Deals | Store"
	this.getStoreDetail()
}

componentWillUpdate(nextProps){
	if (!isEmpty(this.state.data)) document.title="Deals | "+this.state.data.store.name	
	if (nextProps.match.params.slug !== this.state.slug) {
			
		this.setState({slug:nextProps.match.params.slug, isLoading:true},()=>{
			this.getStoreDetail(this.state.slug)
		})
	}
}

HandleLoadMoreDeal=()=>{
	let dealQuery
	dealQuery=(Number(this.state.data.deals.pagination.page)+1)
	this.setState({dealQuery, loadmore:true},()=>{
		this.getStoreDetail()
	})
}

// HandleLoadMoreCoupon=()=>{
// 	let couponQuery
// 	couponQuery=(Number(this.state.data.coupons.pagination.page)+1)
// 	this.setState({couponQuery, loadmore:true},()=>{
// 		this.getStoreDetail()
// 	})
// }

handleInputChange = (event) => {
	this.setState({
		query: event.target.value
	})

	//for coupons
	// let filteredCoupon
	// 	filteredCoupon=this.state.allCoupons
	// 	filteredCoupon=filteredCoupon.filter((coupon)=>{
	// 		let couponName=coupon.title.toLowerCase()
	// 		return couponName.indexOf(
	// 				this.state.query.toLowerCase()) !==-1
	// })
	// this.setState({filteredCouponContent:filteredCoupon})

	//for deals
	let filteredDeal
	filteredDeal=this.state.allDeals
	filteredDeal=filteredDeal.filter((deal)=>{
		let dealName=deal.title.toLowerCase()
		return dealName.indexOf(
				this.state.query.toLowerCase()) !==-1
	})
	this.setState({filteredDealContent:filteredDeal})
}

handleSearch=(e)=>{
	if(e.key === 'Enter') {
		let searchQuery=this.state.query
		this.setState({searchQuery},()=>{
			this.getStoreDetail(true)
		})
	}
}

	render() {
		const {allCoupons, allDeals,filteredCouponContent, filteredDealContent, query, searchQuery,data }=this.state
		let storeContent, allCouponsContent, allDealContent, followContent;

		if (isEmpty(data) || this.state.isLoading ) {
			storeContent = <Spinner/>;
		} else {
			
			if (CheckLoggedIn()){ 
				followContent=data.store.follow_status==1?<button className="btn followingButton" onClick={this.handleFollowStore}>Following <FontAwesomeIcon icon={faCheck}/></button> : <button className="btn followButton" onClick={this.handleFollowStore}>Follow Store</button>
			}else{
				followContent=<div className="followNull"></div>
			}

			// if(query.length===0 || searchQuery!='' && searchQuery!='&search_term='){
			// 	allCouponsContent=<LongCouponFeed data={allCoupons}/>
			// }else{
			// 	allCouponsContent=<LongCouponFeed data={filteredCouponContent}/>
			// }

			if(query.length===0 || searchQuery!='' && searchQuery!='&search_term='){
				allDealContent=<DealFeed3 deals={allDeals}/>
			}else{
				allDealContent=<DealFeed3 deals={filteredDealContent}/>
			}

			let loadMoreContent=this.state.loadmore?<div id="buttonSpinner"><Spinner/></div>: 'Load More'

			
      storeContent=
				<div id="storeDetail">
        	<StoreHeader data={data.store} coupon={data.coupons.pagination.total} deal={data.deals.pagination.total}/>

        	<div id="storeTabs">
					<TabHeader deal={allDeals.length} coupon={allCoupons.length}/>
					</div>

          <div id="storeTabContent">
						<div className="container">
							<div className="row">
								<div className="col-md-3 col-sm-12">
									<div id="imageDiv">
										<img src={data.store.logo}/>
									</div>
									{followContent}
									<SearchSide value={this.state.query} change={this.handleInputChange} handleSearch={this.handleSearch}/>						
								</div> {/* left column containing search and image ends */}
 
								<div className="col-md-9 col-sm-12">
									<div className="tab-content">
  								    {/* <div role="tabpanel" className="tab-pane active" id="all">
												<div id="sh1"><SimpleHeader title={"Top Coupons"}/></div>
												{allCouponsContent}
												<div className="loadMoreWrap">{this.state.data.coupons.pagination.next &&<button onClick={this.HandleLoadMoreCoupon} className="loadMore">{loadMoreContent}</button>}</div>

												<div id="sh1"><SimpleHeader title={"Top Deals"}/></div>
												{allDealContent}
												<div className="loadMoreWrap">{this.state.data.deals.pagination.next &&<button onClick={this.HandleLoadMoreDeal} className="loadMore">{loadMoreContent}</button>}</div>
											</div> */}

  						  			<div role="tabpanel" className="tab-pane active" id="deals">
												{/* <div id="sh1"><SimpleHeader title={"Top Deals"}/></div> */}
												{allDealContent}
												<div className="loadMoreWrap">{this.state.data.deals.pagination.next &&<button onClick={this.HandleLoadMoreDeal} className="loadMore">{loadMoreContent}</button>}</div>	
						  				</div>

  							 			{/* <div role="tabpanel" className="tab-pane" id="coupons">
												<div id="sh1"><SimpleHeader title={"Top Coupons"}/></div>
												{allCouponsContent}
												<div className="loadMoreWrap">{this.state.data.coupons.pagination.next &&<button onClick={this.HandleLoadMoreCoupon} className="loadMore">{loadMoreContent}</button>}</div>
							  			</div> */}
  								</div>
							</div>
						</div>
					</div>
				</div>
            </div>
        }
		return (
			<React.Fragment>
				<link rel="stylesheet" type="text/css" href={style}/>
        {storeContent}
				<About/>
			</React.Fragment>
		);
	}
}
 
export default StoreDetails;