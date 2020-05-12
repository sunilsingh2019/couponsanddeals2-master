import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import { Link } from 'react-router-dom';

import {relatedOffersPageAPI} from '../../api/apiURLs'
import axios from '../../api/axiosInstance'

// import {getRelatedOffers} from '../../actions/userAction'

import SearchSide from '../../components/search/search'
import SimpleHeader from '../../components/companyHeader/simpleHeader'
import CouponFeed from '../../components/coupon/longCouponFeed'
import DealFeed from '../../components/deal/dealFeed3';
import Spinner from '../../components/spinner/spinner';
import SearchFor from '../../components/sortBy/sortByOffers'

class RelatedOffersPage extends Component {
    constructor(props){
		super(props)
		this.state={
            data:{},
            isLoading:true,
            searchTerm:'',
            dealPage:'',
            couponPage:'',
            allCoupons:[],
            allDeals:[],
            couponQuery:'',
            dealQuery:'',
            filteredCouponContent:[],
            filteredDealContent:[],
            searchQuery:'',
            query:'',
            selectedOption:'default'
		}
    }
    
    componentDidMount() {
		document.title = 'Deals | Just for you';
		this.getRelatedOffers();
    }

    getRelatedOffers=(doSearch)=>{
        let oldCoupons=[...this.state.allCoupons]
		let oldDeals=[...this.state.allDeals]
        let oldCouponPage=this.state.couponPage
        let oldDealPage=this.state.dealPage
        let search

        if(doSearch){
            search=this.state.searchQuery
        }else{
            search=this.state.searchTerm+'&deal_page='+this.state.dealQuery+'&coupon_page='+this.state.couponQuery
        }

        const access_token = window.localStorage.getItem('access_token');
	    const headers = {
	    	Accept: 'application/json',
	    	'Content-Type': 'application/json',
	    	Authorization: `Bearer ${access_token}`, 
	    };
        axios({
            method:'get',
            url:relatedOffersPageAPI(search),
            headers:{...headers}
        })
		.then(response => {
            console.log(response.data);
            this.setState(() => ({
                data: response.data,
                isLoading:false,
                dealPage:response.data.deals.pagination.page,
                couponPage:response.data.coupons.pagination.page,
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
                    allCoupons:response.data.coupons.data,
                })
            }
        })
		.catch(error => {
			console.log('error',error);
		});
    }
    
    HandleLoadMoreCoupon=()=>{
        let couponQuery=(Number(this.state.couponPage)+1)
		this.setState({couponQuery},()=>{
			this.getRelatedOffers()
		})
    }
    HandleLoadMoreDeal=()=>{
        let dealQuery=(Number(this.state.dealPage)+1)
		this.setState({dealQuery},()=>{
			this.getRelatedOffers()
		})
    }

    handleInputChange = (event) => {
		this.setState({
			query: event.target.value
		})
	
		//for coupons
		let filteredCoupon
			filteredCoupon=this.state.allCoupons
		    filteredCoupon=filteredCoupon.filter((coupon)=>{
				let couponName=coupon.title.toLowerCase()
				return couponName.indexOf(
						this.state.query.toLowerCase()) !==-1
		})
        this.setState({filteredCouponContent:filteredCoupon})
	
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
                this.getRelatedOffers(true)
			})
		}
    }

    handleSort = e => {
		this.setState({ selectedOption: e.target.value });
	};

    
    render() { 
        let pageContent, allCouponsContent, allDealsContent, allStoresContent
        const {data, allCoupons, allDeals, query, searchQuery, filteredCouponContent, filteredDealContent, allStores, filteredStoreContent, selectedOption}=this.state

        if(isEmpty(data)){
            pageContent=<Spinner/>
        }else{
            if (selectedOption==='default' || selectedOption==='deals'){
                if(query.length===0 || searchQuery!=''){
                    allDealsContent=
                    <React.Fragment>
                        <SimpleHeader title="Deals"/>
                        <DealFeed deals={allDeals}/>
                        <div className="loadMoreWrap">{this.state.data.deals.pagination.next &&<button onClick={this.HandleLoadMoreDeal} className="loadMore">Load More</button>}</div>
                    </React.Fragment>
                }else{
                    allDealsContent=
                    <React.Fragment>
                        <SimpleHeader title="Deals"/>
                        <DealFeed deals={filteredDealContent}/>
                        <div className="loadMoreWrap">{this.state.data.deals.pagination.next &&<button onClick={this.HandleLoadMoreDeal} className="loadMore">Load More</button>}</div>
                    </React.Fragment>
                }
            }

            if (selectedOption==='default' || selectedOption==='coupons'){
                if(query.length===0 || searchQuery!=''){
			    	allCouponsContent= 
                    <React.Fragment>
                        <SimpleHeader title="Coupons"/>
                        <CouponFeed data={allCoupons}/>
                        <div className="loadMoreWrap">{this.state.data.coupons.pagination.next &&<button onClick={this.HandleLoadMoreCoupon} className="loadMore">Load More</button>}</div>
                    </React.Fragment>
			    }else{
			    	allCouponsContent=
                    <React.Fragment>
                        <SimpleHeader title="Coupons"/>
                        <CouponFeed data={filteredCouponContent}/>
                        <div className="loadMoreWrap">{this.state.data.coupons.pagination.next &&<button onClick={this.HandleLoadMoreCoupon} className="loadMore">Load More</button>}</div>
                    </React.Fragment>
                }
            }
            pageContent=
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 col-12">
                    <SearchSide
						value={this.state.query}
						change={this.handleInputChange}
						handleSearch={this.handleSearch}
					/>
                    <SearchFor 
                     checked={this.state.selectedOption} 
                     change={this.handleSort} 
                    />
                    </div>

                    <div className="col-lg-9 col-md-8 col-sm-8 col-xs-12 col-xs-12">
                        {allCouponsContent}
                        {allDealsContent}
                    </div>
                </div>
            </React.Fragment>
        }
        
        return ( 
            <React.Fragment>
                <div id="relatedOffersPage">
                    <div id="needsMargin"><SimpleHeader title="Offers you might like"/></div>
                    <div className="container">
                        {pageContent}
                    </div>
                </div>
            </React.Fragment>
         );
    }
}

export default RelatedOffersPage;