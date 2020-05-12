import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { registerUser, loginViaFacebook, loginViaGoogle } from '../../actions/authActions';

import LoginHeader from '../../components/companyHeader/loginHeader';
import isEmpty from '../../validation/isEmpty';
import Spinner from '../../components/spinner/spinner';
import FormInput from '../../components/common/formInput'

class Register extends Component {
	constructor() {
		super();
		this.state = {
			account: {
				password: '',
				confirmPassword: '',
				name: '',
				email: '',
			},
			isLoading: false,
			errors: [],
			facebookHelp: undefined,
			googleHelp: undefined,
		};
	}

	facebookLoginHandle = response => {
		if (isEmpty(response.email)) {
			this.setState({
				facebookHelp: 'We cannot access your email!!',
			});
		} else {
			const user = {
				provider: 'facebook',
				facebookId: response.id,
				email: response.email,
				name: response.name,
			};
			this.props.loginViaFacebook(user);
		}
	};

	googleResponse = response => {
		if (isEmpty(response.profileObj.email)) {
			this.setState({
				googleHelp: 'We cannot access your email!!',
			});
		} else {
			const user = {
				provider: 'google',
				googleId: response.googleId,
				email: response.profileObj.email,
				name: response.profileObj.name,
			};
			this.props.loginViaGoogle(user);
		}
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors && this.props.errors !== nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
				isLoading: false,
			});
		}
	}
	showPassword = e => {
		e.preventDefault();
		var x = document.getElementById('password');
		if (x.type === 'password') {
			x.type = 'text';
			document.getElementById('showPassword').style.color = '#634099';
		} else {
			x.type = 'password';
			document.getElementById('showPassword').style.color = '#b0b2bb';
		}
	};

	showPasswordC = e => {
		e.preventDefault();
		var x = document.getElementById('confirmPassword');
		if (x.type === 'password') {
			x.type = 'text';
			document.getElementById('showPasswordC').style.color = '#634099';
		} else {
			x.type = 'password';
			document.getElementById('showPasswordC').style.color = '#b0b2bb';
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		this.setState({
			isLoading: true,
		});
		const newUser = {
			name: this.state.account.name,
			email: this.state.account.email,
			password: this.state.account.password,
			confirm_password: this.state.account.confirmPassword,
		};
		console.log(newUser);
		this.props.registerUser(newUser, this.props.history, this.state.account);
	};

	handleChange = e => {
		const account = { ...this.state.account };
		account[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ account });
	};

	hasErrorFor = field => {
		return !!this.state.errors[field];
	};

	renderErrorFor = field => {
		if (this.hasErrorFor(field)) {
			return (
				<span className="invalid-feedback">
					<strong className="strongErrorMsg">{this.state.errors[field][0]}</strong>
				</span>
			);
		}
	};

	render() {
		const { facebookHelp, googleHelp } = this.state;
		if (this.state.isLoading) {
			return (
				<div id="spinnerWrap">
					<Spinner />
				</div>
			);
		}
		return (
			<React.Fragment>
				<div id="registerPage">
					<div id="forSpace" />
					<div id="registerDiv">
						<LoginHeader title={'Sign up'} />
						<form>
							{/* <label htmlFor="email">Email Address</label> */}
							{/* <input
								value={this.state.account.email}
								className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
								name="email"
								onChange={this.handleChange}
							/>
							{this.renderErrorFor('email')} */}
							<FormInput
                                type="text"
                                value={this.state.account.email} 
                                title="Email Address"
                                change={this.handleChange}
                                name="email"
								errors={this.state.errors}/>

							<label htmlFor="name">Username</label>
							<input
								value={this.state.account.name}
								className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
								name="name"
								onChange={this.handleChange}
							/>
							{this.renderErrorFor('name')}

							<label htmlFor="password">Password</label>
							<input
								value={this.state.account.password}
								className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
								name="password"
								type="password"
								id="password"
								onChange={this.handleChange}
							/>
							<div id="showPassword" onClick={this.showPassword}>
								<FontAwesomeIcon icon={faEye} />
							</div>
							{this.renderErrorFor('password')}

							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								value={this.state.account.confirmPassword}
								className={`form-control ${this.hasErrorFor('confirm_password') ? 'is-invalid' : ''}`}
								name="confirmPassword"
								type="password"
								id="confirmPassword"
								onChange={this.handleChange}
							/>
							<div id="showPasswordC" onClick={this.showPasswordC}>
								<FontAwesomeIcon icon={faEye} />
							</div>
							{this.renderErrorFor('confirm_password')}

							<button
								className="regButton"
								value="Register"
								type="submit"
								id="signup"
								onClick={this.handleSubmit}
							>
								Sign Up
							</button>
						</form>

						<p>Or Login with,</p>
						<div id="loginOptions">
							<div className="row">
								<div className="col-md-6 col-sm-12">
									<FacebookLogin
										appId="1274382202732645"
										autoLoad={false}
										fields="name,email,picture"
										callback={this.facebookLoginHandle}
									/>
									{facebookHelp && <div className="alert alert-danger">{facebookHelp}</div>}
								</div>

								<div className="col-md-6 col-sm-12" id="google">
									<GoogleLogin
										clientId="230529285039-j2pe6ttquvabbodqgppkrpvf8htd3dql.apps.googleusercontent.com"
										buttonText="Login"
										onSuccess={this.googleResponse}
										onFailure={this.googleResponse}
									/>
									{googleHelp && <div className="alert alert-danger">{googleHelp}</div>}
								</div>
							</div>
						</div>
					</div>

					<div id="newHere">
						Already a member?
						<Link to="/login">Login</Link>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ registerUser, loginViaFacebook, loginViaGoogle }
)(withRouter(Register));
