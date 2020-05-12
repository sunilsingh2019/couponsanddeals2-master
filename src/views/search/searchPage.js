import React, { Component } from 'react';
import isEmpty from '../../validation/isEmpty';

import {searchAPI} from '../../api/apiURLs'
import axios from '../../api/axiosInstance'

import queryString from 'query-string';
import Spinner from '../../components/spinner/spinner';

import DealFeed from '../../components/deal/dealFeed3';
import SimpleHeader from '../../components/companyHeader/simpleHeader';
// import CouponFeed4 from '../../components/coupon/couponFeed4';
import SearchFor from '../../components/sortBy/sortBySearch'
import SearchSide from '../../components/search/search'
import StoresFeed from '../../components/store/normalBigStoreFeed3'

import {QueryString} from '../../helpers/index'

class SearchPage extends Component {
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
            allStores:[],
            storePage:'', 
            couponQuery:'',
            storeQuery:'',
            dealQuery:'',
            filteredCouponContent:[],
            filteredDealContent:[],
            filteredStoreContent:[],
            query:'',
            selectedOption:'default',
            loadmore:false
		}
	}
    componentDidMount() {
        let searchTerm=(queryString.parse(this.props.location.search).search)
        this.setState({searchTerm},()=>this.getSearchResults())
    }

    componentWillUpdate(nextProps){
        let searchTerm=(queryString.parse(this.props.location.search).search)
        let nextSearchTerm=(queryString.parse(nextProps.location.search).search)
		if (nextSearchTerm !== searchTerm) {
            console.log(nextSearchTerm)
			this.setState({searchTerm:nextSearchTerm, isLoading:true},()=>{
				this.getSearchResults(true)
			})
		}
	}

    getSearchResults=(doSearch)=>{
        this.setState({isLoading:true})
        
        let oldCoupons=[...this.state.allCoupons]
        let oldStore=[...this.state.allStores]
		let oldDeals=[...this.state.allDeals]
        let oldCouponPage=this.state.couponPage
        let oldStorePage=this.state.storePage
        let oldDealPage=this.state.dealPage
        let search

        if (doSearch){
			search=this.state.searchTerm
		}else{
			search=this.state.searchTerm+'&deal_page='+this.state.dealQuery+'&coupon_page='+this.state.couponQuery+'&store_page='+this.state.storeQuery
        }
        
		axios
			.get(searchAPI(search))
			.then(response => {
				console.log(response.data);
				this.setState(() => ({
					data: response.data,
                    isLoading:false,
                    dealPage:response.data.deals.pagination.page,
                    couponPage:response.data.coupons.pagination.page,
                    storePage:response.data.stores.pagination.page,
                    query:'',
                    loadmore:false
                }));
                
                if(oldCouponPage!==response.data.coupons.pagination.page){
					this.setState(()=>({
						allCoupons:[...oldCoupons, ...response.data.coupons.data]
					}))
                }
                if(oldStorePage!==response.data.stores.pagination.page){
					this.setState(()=>({
						allStores:[...oldStore, ...response.data.stores.data]
					}))
				}
				if (oldDealPage !==response.data.deals.pagination.page){
					this.setState(()=>({
						allDeals:[...oldDeals, ...response.data.deals.data]
					}))
                }
                if(doSearch){
                    this.setState({
                        allDeals: response.data.deals.data,
                        allCoupons: response.data.coupons.data,
                        allStores:response.data.stores.data,
                    })
                }
			})
			.catch(error => {
				console.log('error',error);
			});
	}

    // HandleLoadMoreCoupon=()=>{
    //     let couponQuery=(Number(this.state.couponPage)+1)
	// 	this.setState({couponQuery, loadmore:true},()=>{
	// 		this.getSearchResults()
	// 	})
    // }
    HandleLoadMoreStore=()=>{
        let storeQuery=(Number(this.state.storePage)+1)
		this.setState({storeQuery, loadmore:true},()=>{
			this.getSearchResults()
		})
    }

    HandleLoadMoreDeal=()=>{
        let dealQuery=(Number(this.state.dealPage)+1)
		this.setState({dealQuery, loadmore:true},()=>{
			this.getSearchResults()
		})
    }

    handleInputChange = (event) => {
		this.setState({
			query: event.target.value
		})
	
		//for coupons
		// let filteredCoupon
		// 	filteredCoupon=this.state.allCoupons
		//     filteredCoupon=filteredCoupon.filter((coupon)=>{
		// 		let couponName=coupon.title.toLowerCase()
		// 		return couponName.indexOf(
		// 				this.state.query.toLowerCase()) !==-1
		// })
        // this.setState({filteredCouponContent:filteredCoupon})
        
        //for stores
		let filteredstore
        filteredstore=this.state.allStores
        filteredstore=filteredstore.filter((store)=>{
            let storeName=store.name.toLowerCase()
            return storeName.indexOf(
                    this.state.query.toLowerCase()) !==-1
    })
    this.setState({filteredStoreContent:filteredstore})
	
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
            let query=QueryString(this.state.query)
            this.props.history.push('/browse?search=' + query);
		}
    }

    handleSort = e => {
		this.setState({ selectedOption: e.target.value });
	};
    
    render() { 
        console.log(this.state)
        const values = queryString.parse(this.props.location.search)
        let pageContent, allCouponsContent, allDealsContent, allStoresContent
        const {data, allCoupons, allDeals, query, filteredCouponContent, filteredDealContent, allStores, 
            filteredStoreContent, selectedOption}=this.state

        if(isEmpty(data)){
            pageContent=<div id="spinnerWrap"><Spinner/></div>
        }else{
            let loadMoreContent=this.state.loadmore?<div id="buttonSpinner"><Spinner/></div>: 'Load More'
            
            if (selectedOption==='default' || selectedOption==='deals'){
                if(query.length===0){
                    allDealsContent=
                    <React.Fragment>
                        <SimpleHeader title="Deals"/>
                        <DealFeed deals={allDeals}/>
                        <div className="loadMoreWrap">{this.state.data.deals.pagination.next &&<button onClick={this.HandleLoadMoreDeal} className="loadMore">{loadMoreContent}</button>}</div>
                    </React.Fragment>
                }else{
                    allDealsContent=
                    <React.Fragment>
                        <SimpleHeader title="Deals"/>
                        <DealFeed deals={filteredDealContent}/>
                        <div className="loadMoreWrap">{this.state.data.deals.pagination.next &&<button onClick={this.HandleLoadMoreDeal} className="loadMore">{loadMoreContent}</button>}</div>
                    </React.Fragment>
                }
            }

            // if (selectedOption==='default' || selectedOption==='coupons'){
            //     if(query.length===0){
			//     	allCouponsContent= 
            //         <React.Fragment>
            //             <SimpleHeader title="Coupons"/>
            //             <CouponFeed4 coupons={allCoupons}/>
            //             <div className="loadMoreWrap">{this.state.data.coupons.pagination.next &&<button onClick={this.HandleLoadMoreCoupon} className="loadMore">{loadMoreContent}</button>}</div>
            //         </React.Fragment>
			//     }else{
			//     	allCouponsContent=
            //         <React.Fragment>
            //             <SimpleHeader title="Coupons"/>
            //             <CouponFeed4 coupons={filteredCouponContent}/>
            //             <div className="loadMoreWrap">{this.state.data.coupons.pagination.next &&<button onClick={this.HandleLoadMoreCoupon} className="loadMore">{loadMoreContent}</button>}</div>
            //         </React.Fragment>
            //     }
            // }

            if (selectedOption==='default' || selectedOption==='stores'){
                if(query.length===0 ){
                    allStoresContent= 
                    <React.Fragment>
                        <SimpleHeader title="Stores"/>
                        <StoresFeed stores={allStores}/>
                        <div className="loadMoreWrap">{this.state.data.stores.pagination.next &&<button onClick={this.HandleLoadMoreStore} className="loadMore">{loadMoreContent}</button>}</div>
                    </React.Fragment>
                }else{
                    allStoresContent=
                    <React.Fragment>
                        <SimpleHeader title="Stores"/>
                        <StoresFeed stores={filteredStoreContent}/>
                        <div className="loadMoreWrap">{this.state.data.stores.pagination.next &&<button onClick={this.HandleLoadMoreStore} className="loadMore">{loadMoreContent}</button>}</div>
                    </React.Fragment>
                }
            }
            
            pageContent=
            <React.Fragment>
                
                <h2>We found {data.stores.pagination.total} stores and
                {/* {data.coupons.pagination.total} coupons and  */}
                {data.deals.pagination.total} deals for you!!</h2>
                <hr/>

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
                        {allStoresContent}
                        {allDealsContent}
                        {/* {allCouponsContent} */}
                    </div>
                </div>
            </React.Fragment>
        }
        return ( 
            <React.Fragment>
               <div id="searchPage">
                    <div className="container">
                        <h1>Showing search results for '{values.search}' </h1>  
                         {pageContent}
                    </div>
                </div> 
            </React.Fragment>
         );
    }
} 
 
export default SearchPage;
