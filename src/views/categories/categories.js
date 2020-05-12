import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';

import { getAllCategories } from '../../actions/categoryActions';
import Spinner from '../../components/spinner/spinner';

class CategoryPage extends Component {
    state = {  }

    componentDidMount() {
		this.props.getAllCategories();
    }
    
    render() { 
        const {categories, categoriesLoading}=this.props.categories
        let categoryContent

        if (isEmpty(categories) || categoriesLoading){
            categoryContent=<Spinner/>
        }else{
            categoryContent=
            <ul className="lev1">
                {categories.data.map((item)=>(
                    <React.Fragment key={item.id}>
                        <h1><Link to={"/category/"+item.slug}>{item.name}</Link></h1>
                        <ul className="lev2">
                            <div className="row">
                                {item.sub_category.map((subItem)=>(
                                    <div key={subItem.id} className="col-sm-6 col-xs-12">
                                        <li>
                                            <Link to={"/subcategory/"+item.slug+"/"+subItem.slug}>{subItem.name}</Link>
                                        </li>
                                    </div>
                                ))}
                            </div>
                        </ul>
                    </React.Fragment>
                ))}
            </ul>
        }
        return ( 
            <React.Fragment>
                <div id="catPage">
                    <div className="container">
                        {categoryContent}
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
CategoryPage.propTypes = {
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
	)(CategoryPage)
);
