import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import style from './navbar2.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import Categories from '../dropdowns/categoryDropdown';
import StoreDropdown from '../dropdowns/storeDropdown';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import fakeLogo from '../../assets/images/logos/fakeLogo.png';
import NavbarSearch from '../navbarSearch/navbarSearch';

class NewNavbar extends Component {
	state={
		width:''
	}

	componentWillMount() {	
		this.updateDimensions();
	}

	componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
	}

	updateDimensions=()=> {
		let width=window.innerWidth
        this.setState({width});
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
	}
	
	onLogout(e) {
		e.preventDefault();
		this.props.logoutUser(this.props.history);
	}

	onLogout(e) {
		e.preventDefault();
		this.props.logoutUser(this.props.history);
	}

	render() {
		let profileContent, categoryContent

		if (this.state.width<992){
			profileContent=
			<React.Fragment>
				<li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-link smallGoRight">
					<Link className="hideThis" to="/login">Login</Link>
				</li>
				<li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-link smallGoRight">
					<Link className="hideThis" to="/register">Signup</Link>
				</li>
			</React.Fragment>

			categoryContent=
			<li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-link" id="category">
				<Link to="/categories" className="navLis">
					CATEGORIES
				</Link>
			</li>
		}else{
			profileContent=
			<li  data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-item dropdown">
				<a
					href="#"
					className="dropdown-toggle"
					role="button"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					<FontAwesomeIcon icon={faUser} />
				</a>
				<div data-toggle="collapse" data-target=".navbar-collapse.show" className="dropdown-menu" aria-labelledby="navbarDropdown">
					<Link to="/login" className="dropdown-item">
						Login
					</Link>
					<Link to="/register" className="dropdown-item">
						Sign Up 
					</Link>
				</div>
			</li>

			categoryContent=
			<li className="nav-link" id="category">
				<a href="#" className="navLis hideThis">
					CATEGORIES
				</a>
				<div id="categoryDropdown">
					<Categories />
				</div>
			</li>
		}

		const { isAuthenticated, user } = this.props.auth;
		const guestLinks = <React.Fragment>{profileContent}</React.Fragment>

		const authLinks = (
			<React.Fragment>
				<Link to="/profile">
					<FontAwesomeIcon className="hideThis" icon={faUser} />
				</Link>
			</React.Fragment>
		);

		return (
			<React.Fragment>
				<link ref="stylesheet" type="text/css" href={style} />
				<div id="nav2">
					<div className="container">
						<nav className="navbar navbar-expand-lg navbar-light">
							<div id="logoNav">
								{/* <h1> */}
								<Link to="/">
									<img src={fakeLogo} />
								</Link>{' '}
								{/* </h1> */}
							</div>
							<button
								className="navbar-toggler"
								type="button"
								data-toggle="collapse" 
								data-target="#navbarSupportedContent"
								aria-controls="navbarSupportedContent"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon" />
							</button>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
									<li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-link" id="storeD">
										<Link  className="hideThis" to="/stores">STORES</Link>
										<div id="storeDropdown">
											<StoreDropdown />
										</div>
									</li>

									{categoryContent}

									<li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-link">
										<Link className="hideThis" to="/deals">DEALS<span id="hideDeal"> OF THE DAY</span></Link>
									</li>

									{/* <li data-toggle="collapse" data-target=".navbar-collapse.show" className="nav-link">
										<Link className="hideThis" to="/coupons">COUPONS </Link>
									</li> */}

									{/* {user.role === 'store' &&
                    <li className="nav-link dropdown">
      								  <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      								    STORE DASHBOARD
      								  </a>
      								  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
													<Link className="dropdown-item" to="/my-stores">View my Stores</Link>
													<Link className="dropdown-item" to="/registerStore">Register Store</Link>
      								  	<Link className="dropdown-item" to="/addCoupons">Add Coupons</Link>
													<Link className="dropdown-item" to="/unit-purchase">Unit Purchase</Link>
      								    <Link className="dropdown-item" to="/addDeal">Add Deals</Link>
													<Link className="dropdown-item" to="/">Feature Request</Link>
      								  </div>
      								</li>
                  } */}
								</ul>

								<div id="leftIcons">
									<ul>
										<li data-toggle="collapse" data-target=".navbar-collapse.show">
											<NavbarSearch />
										</li>

										{isAuthenticated ? authLinks : guestLinks}
										
									</ul>
								</div>
							</div>
						</nav>
					</div>
				</div>
				<div id="belowPadding" />
			</React.Fragment>
		);
	}
}

NewNavbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default withRouter(
	connect(
		mapStateToProps,
		{ logoutUser }
	)(NewNavbar)
);
