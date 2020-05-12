import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import style from './dropdown.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';

import { getAllCategories } from '../../actions/categoryActions';
import Spinner from '../../components/spinner/spinner';

class CategoryDropdown extends Component {
	componentDidMount() {
		this.props.getAllCategories();
	}

	render() {
		// console.log(this.props)
		const { categories, categoriesLoading } = this.props.categories;
		let categoriesContent;

		if (isEmpty(categories) || categoriesLoading) {
			categoriesContent = <Spinner />;
		} else {
			categoriesContent = categories.data.slice(0, 6).map(category => (
				<li id="level1" key={category.id}>
				
					<Link to={'/category/' + category.slug}>{category.name}</Link>
					<div id="level2">
						<ul>
							{category.sub_category.slice(0, 6).map(subCat => (
								<li key={subCat.id}>
									<Link to={'/subcategory/' + category.slug + '/' + subCat.slug}>{subCat.name}</Link>
								</li>
							))}
						</ul>
					</div>
				</li>
			));
		}
		return (
			<React.Fragment>
				<link rel="stylesheet" type="text/css" href={style} />
				<ul>{categoriesContent}</ul>
			</React.Fragment>
		);
	}
}

CategoryDropdown.propTypes = {
	getAllCategories: PropTypes.func.isRequired,
	categories: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	categories: state.categories,
});

export default withRouter(
	connect(
		mapStateToProps,
		{ getAllCategories }
	)(CategoryDropdown)
);
