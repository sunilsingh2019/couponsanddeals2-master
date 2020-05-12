import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';

import { getFeaturedStores } from '../../actions/storeActions';
import { getAllCategories } from '../../actions/categoryActions'; 
import axios from '../../api/axiosInstance';
import { allStoresAPI } from '../../api/apiURLs';

import style from './stores.css';

import StoreFeed2 from '../../components/store/storeFeed2';
import SortBy from '../../components/sortBy/sortBy';
import SearchSide from '../../components/search/search';
import SimpleHeader from '../../components/companyHeader/simpleHeader';
import BigStoreFeed from '../../components/store/bigStoreFeed';
import AboutStore from '../../components/about/aboutCoupon';
import BigStoreLoading from '../../components/spinner/bigStoreLoading';
import Spinner from '../../components/spinner/spinner';

class StoresPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			progress: false,
			hasMore: true,
			query: '',
			selectedOption: 'a2z',
			pageQuery: '',
			currentPage: 0,
			filteredContent:[]
		};
		// this.infiniteScroll = this.infiniteScroll.bind(this);
	}

	handleInputChange = event => {
		this.setState({
			query: event.target.value,
		});
		let filteredStore;
		filteredStore = this.state.data;
		filteredStore = filteredStore.filter(store => {
			let storeName = store.name.toLowerCase();
			return storeName.indexOf(this.state.query.toLowerCase()) !== -1;
		});
		this.setState({ filteredContent: filteredStore });
	};

	handleSearch = e => {
		if (e.key === 'Enter') {
			let searchQuery = '?search_term=' + this.state.query;
			// this.props.getAllStores(searchQuery);
			axios
				.get(allStoresAPI + searchQuery)
				.then(response => {
					console.log(response, "all stores");
					this.setState(() => ({
						data: response.data.data,
						progress: false,
						hasMore: response.data.pagination.next,
						currentPage: Number(response.data.pagination.page),
					}));
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	handleSort = e => {
		this.setState({ selectedOption: e.target.value });
	};

	componentDidMount() {
		document.title = 'Deals | All Stores';
		this.props.getFeaturedStores();
		this.getInitialState();
		this.refs.iScroll.addEventListener('scroll', () => {
			if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight) {
				this.infiniteScroll();
			}
		});
		// window.addEventListener('scroll', this.infiniteScroll);
	}

	getInitialState() {
		this.setState(() => ({
			progress: true,
		}));
		axios
			.get(allStoresAPI)
			.then(response => {
				console.log(response.data, "initial state");
				this.setState(() => ({
					data: response.data.data,
					progress: false,
					hasMore: response.data.pagination.next,
					currentPage: Number(response.data.pagination.page),
				}));
			})
			.catch(error => {
				console.log(error);
			});
	}

	infiniteScroll() {
		if (isEmpty(this.state.query)) {
			if (this.state.hasMore && !this.state.progress) {
				let pageQuery = '?page=' + (this.state.currentPage + 1);

				this.setState(() => ({
					progress: true,
					pageQuery: pageQuery,
				}));

				axios
					.get(allStoresAPI + this.state.pageQuery)
					.then(response => {
						setTimeout(() => {
							this.setState(prevState => ({
								data: prevState.data.concat(response.data.data),
								progress: false,
								hasMore: response.data.pagination.next,
								currentPage: Number(response.data.pagination.page),
							}));
						}, 1000);
					})
					.catch(error => {
						console.log(error);
					});
			}
		} else {
			if (this.state.hasMore && !this.state.progress) {
				let pageQuery = '?page=' + (this.state.currentPage + 1);
				let searchQuery = '?search_term=' + this.state.query;
				this.setState(() => ({
					progress: true,
					pageQuery: pageQuery,
					searchQuery: searchQuery,
				}));

				axios
					.get(allStoresAPI + this.state.pageQuery)
					.then(response => {
						setTimeout(() => {
							this.setState(prevState => ({
								data: prevState.data.concat(response.data.data),
								progress: false,
								hasMore: response.data.pagination.next,
								currentPage: Number(response.data.pagination.page),
							}));
						}, 1000);
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	}

	render() {
		// console.log(this.state);
		const { featuredStores, storesLoading } = this.props.stores;
		let allStoresContent, featuredStoresContent;

		//for featured stores
		if (isEmpty(featuredStores.data) || storesLoading) {
			featuredStoresContent = <BigStoreLoading />;
		} else {
			featuredStoresContent = <BigStoreFeed store={featuredStores.data} />;
		}

		const {query, selectedOption, filteredContent, data}=this.state
		if (query.length === 0 ) {
			allStoresContent = <StoreFeed2 sort={selectedOption} store={data} />;
		} else {
			allStoresContent = <StoreFeed2 sort={selectedOption} store={filteredContent} />;
		}

		return (
			<div ref="iScroll" style={{ height: '1200px', overflow: 'auto' }}>
				<link ref="stylesheet" type="text/css" href={style} />
				<div id="storesPage">
					<div id="fullWidth">
						<div className="container">
							<SimpleHeader title={'Featured Stores'} />
						</div>
					</div>
					<div className="container">
						<div id="featuredStores">{featuredStoresContent}</div>

						<div id="allStores">
							<SimpleHeader title={'Browse All Stores'} />
							<div className="row">
								<div className="col-md-3 col-sm-12">
									<div id="searchAndSort">
										<SearchSide
											value={this.state.query}
											change={this.handleInputChange}
											handleSearch={this.handleSearch}
										/>
										<SortBy checked={this.state.selectedOption} change={this.handleSort} />
									</div>
								</div>

								<div className="col-md-9 col-sm-12">
									{this.state.data.length > 0 && allStoresContent}
									{this.state.progress && <Spinner />}
								</div>
							</div>
						</div>
					</div>{' '}
					{/* container ends */}
				</div>
				<AboutStore />
			</div>
		);
	}
}

StoresPage.propTypes = {
	getFeaturedStores: PropTypes.func.isRequired,
	stores: PropTypes.object.isRequired,
	getAllCategories: PropTypes.func.isRequired,
	categories: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	stores: state.stores,
	categories: state.categories,
});

export default connect(
	mapStateToProps,
	{ getFeaturedStores, getAllCategories }
)(StoresPage);
