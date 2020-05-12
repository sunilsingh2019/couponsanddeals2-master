import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getFeaturedStores } from '../../actions/storeActions';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';

import style from './dropdown.css';
import Spinner from '../spinner/spinner';

class StoreDropdown extends Component { 
	componentDidMount() {
		this.props.getFeaturedStores();
	}

	render() {
		// console.log('from stoe dropdown',this.props)
		const { featuredStores, storesLoading } = this.props.stores;
		let featuredStoresContent;

		//for featured stores
		if (isEmpty(featuredStores || storesLoading)) {
			featuredStoresContent = <Spinner />;
		} else {
			if (featuredStores.status===true){
			featuredStoresContent = featuredStores.data.slice(0, 6).map(store => (
				<li key={store.id}>
					<Link to={'/store/' + store.slug}>{store.name}</Link>
				</li>
			));
			}else{
				featuredStoresContent=""
			}
		}

		//for all stores
		// if (isEmpty(allStores)) {
		//     featuredStoresContent=<h1>is loading....</h1>
		// } else {
		//     if (filteredContent.length === 0 || query.length===0){
		//         featuredStoresContent = <StoreFeed2 sort={this.state.selectedOption} store={allStores.data}/>;
		//     }else{
		//         featuredStoresContent = <StoreFeed2 sort={this.state.selectedOption} store={filteredContent}/>;
		//     }
		// }

		return (
			<React.Fragment>
				<link rel="stylesheet" type="text/css" href={style} />
				<div className="row">
					<div className="col-sm-4">
						<h5>Featured Stores</h5>
						<ul>{featuredStoresContent}</ul>
					</div>
				</div>
				<Link to="/stores" className="viewAll">
					View All Stores
					<FontAwesomeIcon icon={faAngleDoubleRight} />
				</Link>
			</React.Fragment>
		);
	}
}

StoreDropdown.propTypes = {
	getFeaturedStores: PropTypes.func.isRequired,
	stores: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	stores: state.stores,
});

export default withRouter(
	connect(
		mapStateToProps,
		{ getFeaturedStores }
	)(StoreDropdown)
);
