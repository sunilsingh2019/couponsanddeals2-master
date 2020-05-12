import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions'
import { Link, withRouter } from 'react-router-dom';

class UserTabHeader extends Component {
    onLogout(e) {
		e.preventDefault(); 
		this.props.logoutUser(this.props.history);
	}
  
  onLogout(e) {
    	e.preventDefault(); 
    	this.props.logoutUser(this.props.history);
    }

    render() { 
        return ( 
            <React.Fragment>
                <div id="userTab">
                    <div className="container">
				    	<div className="row">
				    		<div className="col-lg-3 col-md-0"></div>
				    		<div className="col-lg-9 col-md-12">
				    		<ul className="nav nav-tabs" role="tablist">
  				    		    <li id="noDropdown" role="presentation" className="onlyFirst"><a className="active" href="#overview" role="tab" data-toggle="tab">Overview</a></li>

                                {/* <li role="presentation" className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#coupons" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      Coupons
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a href="#activeCoupons" role="tab" data-toggle="tab">View Active Coupons <br/></a>
                                        <a href="#inactiveCoupons" role="tab" data-toggle="tab">View Inactive Coupons<br/></a>
                                    </div>
                                </li> */}

                                <li id="noDropdown" role="presentation"><a href="#stores" role="tab" data-toggle="tab">Stores</a></li>

                                <li id="noDropdown" role="presentation"><a href="#categories" role="tab" data-toggle="tab">Categories</a></li>

                                <li role="presentation" className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#settings" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      Settings
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a href="#editUsername" role="tab" data-toggle="tab">Edit Username <br/></a>
                                        <Link to="/changePassword">Change Password<br/></Link>
                                        <Link to="/registerStore"> Request Store <br/></Link>
                                        <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
                                    </div>
                                </li>
  				    		</ul>
				    		</div>
				    	</div>
				    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
UserTabHeader.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(withRouter(UserTabHeader));