import React, { Component } from 'react';
import isEmpty from '../../validation/isEmpty';

import style from './categoreisPage.css'
import SearchSide from '../../components/search/search'

import StoreHeader from '../../components/companyHeader/storeHeader'
import TabHeader from '../../components/companyHeader/tabHeader'
// import LongCoupon from '../../components/coupon/longCouponFeed'
import SimpleHeader from '../../components/companyHeader/simpleHeader'
import Spinner from '../../components/spinner/spinner';
import DealFeed from '../../components/deal/dealFeed3';

import {offersBySubcategoryAPI} from '../../api/apiURLs'
import axios from '../../api/axiosInstance'

class SubCategoryDetail extends Component { 
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
			slug:this.props.match.params.sub,
			loadmore:false
		}
	} 

	getOffersBySubcategory=(doSearch)=>{
		let oldCoupons=[...this.state.allCoupons]
		let oldDeals=[...this.state.allDeals]
		let oldCouponPage=this.state.currentCoupon
		let oldDealPage=this.state.currentDeal
		let search

		if (doSearch){
			search=this.state.slug+"&search_term="+this.state.searchQuery
		}else{
			search=this.state.slug+this.state.dealQuery+this.state.couponQuery
		}

		axios
			.get(offersBySubcategoryAPI(search))
			.then(response => {
				console.log(response.data);
				if (response.data.status===false){
					this.props.history.push('/not-found');
					return
				}
				this.setState(() => ({
					data: response.data,
					isLoading:false,
					currentCoupon:response.data.coupons.pagination.page,
					currentDeal:response.data.deals.pagination.page,
					loadmore:false
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

	componentDidMount() {
		document.title="Deals | Subcategory"
		this.getOffersBySubcategory	()
	} 

	componentWillUpdate(nextProps){
		if (!isEmpty(this.state.data)) document.title="Deals | "+this.state.data.detail.name	

		if (nextProps.match.params.sub !== this.state.slug) {
			this.setState({slug:nextProps.match.params.sub, isLoading:true},()=>{
				this.getOffersBySubcategory(this.state.slug)
			})
		}
	}

	HandleLoadMoreDeal=()=>{
		let dealQuery
		dealQuery='&deal_page='+(Number(this.state.data.deals.pagination.page)+1)
		this.setState({dealQuery, loadmore:true},()=>{
			this.getOffersBySubcategory()
		})
	}

	// HandleLoadMoreCoupon=()=>{
	// 	let couponQuery
	// 	couponQuery='&coupon_page='+(Number(this.state.data.coupons.pagination.page)+1)
	// 	this.setState({couponQuery, loadmore:true},()=>{
	// 		this.getOffersBySubcategory()
	// 	})
	// }

	handleInputChange = (event) => {
		this.setState({
			query: event.target.value
		})
	
		//for coupons
		// let filteredCoupon
		// 	filteredCoupon=this.state.allCoupons
		// filteredCoupon=filteredCoupon.filter((coupon)=>{
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
				this.getOffersBySubcategory(true)
			})
		}
	}

    render() { 
		let categoriesContent 
		const {allCoupons, allDeals,filteredCouponContent, filteredDealContent, query, searchQuery }=this.state
		const offersByCategory=this.state.data
		let allCouponsContent, allDealContent;
		if (isEmpty(offersByCategory) || this.state.isLoading){
			categoriesContent=<div id="spinnerWrap"><Spinner/></div>
		} else{
			// if(query.length===0 || searchQuery!='' && searchQuery!='&search_term='){
			// 	allCouponsContent=<LongCoupon data={allCoupons}/>
			// }else{
			// 	allCouponsContent=<LongCoupon data={filteredCouponContent}/>
			// }

			if(query.length===0 || searchQuery!='' && searchQuery!='&search_term='){
				allDealContent=<DealFeed deals={allDeals}/>
			}else{
				allDealContent=<DealFeed deals={filteredDealContent}/>
			}

			let loadMoreContent=this.state.loadmore?<div id="buttonSpinner"><Spinner/></div>: 'Load More'

			categoriesContent=
			<div id="categoryDetail" className="subCategoryDetail">
                <StoreHeader data={offersByCategory.detail} coupon={offersByCategory.coupons.pagination.total} deal={offersByCategory.deals.pagination.total}/>

                <div id="categoryTab">
					<TabHeader deal={allDeals.length} coupon={allCoupons.length}/>
				</div>

                <div id="categoryTabContent">
					<div className="container">
						<div className="row">
							<div className="col-md-3 col-sm-12">
								<div id="imageDiv">
									<img src={offersByCategory.detail.image}/>
								</div>
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
									<div id="sh1"><SimpleHeader title={"Top Deals"}/></div>
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
            <link ref="stylesheet" type="text/css" href={style}/>
				{categoriesContent}
            </React.Fragment>
         );
    }
}
 
export default SubCategoryDetail;