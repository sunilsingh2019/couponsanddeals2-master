import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link, withRouter } from 'react-router-dom';
import { loginUser, loginViaFacebook, loginViaGoogle, setAuthRedirectPath } from '../../actions/authActions';
import isEmpty from '../../validation/isEmpty';
import Spinner from '../../components/spinner/spinner'

import './login.css';
 
import LoginHeader from '../../components/companyHeader/loginHeader'
import { dispatch } from 'rxjs/internal/observable/range';
 
class Login extends Component {
	constructor() {
		super();
		this.state = {
			usernameHelp: undefined,
			passwordHelp: undefined,
			invalidCredentials: undefined,
			isLoading: false,
			facebookHelp: undefined,
			googleHelp: undefined,
			errors: {}
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		console.log()
		const email = e.target.formControlsUsername.value;
		const password = e.target.formControlsPassword.value;

		if (password.length === 0) {
			this.setState(() => ({ passwordHelp: 'Password cannot be empty' }));
		} else {
			this.setState(() => ({ passwordHelp: undefined }));
		}

		if (email.length === 0) {
			this.setState(() => ({ usernameHelp: 'Email cannot be empty' }));
		} else {
			this.setState(() => ({ usernameHelp: undefined }));
		}

		if (email.length > 0 && password.length > 0) {
			this.setState(() => ({ isLoading: true }));
			const user = {
				email: email,
				password: password,
			};
			this.props.loginUser(user);
		}
	}

	facebookLoginHandle = response => {
		console.log(response);
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
		console.log(response);
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
			this.props.history.push(this.props.auth.authRedirectPath);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push(this.props.auth.authRedirectPath);
		}
		if (nextProps.errors && this.props.errors !== nextProps.errors) {
			this.setState({
				invalidCredentials: true,
				isLoading: false,
				errors: nextProps
			});
		}
	}
	showPassword=()=>{
		var x = document.getElementById("formControlsPassword");
		  if (x.type === "password") {
			x.type = "text";
			document.getElementById("showPassword").style.color="#634099";
		  } else {
			x.type = "password";
			document.getElementById("showPassword").style.color="#b0b2bb";
		  }
	}

	render() {
		const { usernameHelp, passwordHelp, invalidCredentials, facebookHelp, googleHelp, errors } = this.state;
		if (this.state.isLoading) {
			return <div id="spinnerWrap"><Spinner/></div> ;
		}
		return (
			<React.Fragment>
				<div id="loginPage">
					<div id="forSpace"></div>
					<div id="loginDiv">
						<LoginHeader title={"Login"}/>
						<div className="container">
							<form onSubmit={this.handleSubmit}>
								{invalidCredentials && (
									<div className="alert alert-danger">{errors.errors.message}</div>
								)}

								<label htmlFor="email">Email</label>
								<input
									type="text"
									id="formControlsUsername"
									name="email"
									placeholder="Please enter your Email"
									value={this.state.email}
								/>
								{usernameHelp && (
									<div className="alert alert-danger">{usernameHelp}</div>
								)}

								<label htmlFor="password">Password</label>
			 					<input
									type="password"
									id="formControlsPassword"
									className="formControlsPassword"
									name="password"
									placeholder="Please enter your Password"
									value={this.state.password}
								/>
								{passwordHelp && (
									<div className="alert alert-danger">{passwordHelp}</div>
								)}
								<div id="showPassword" onClick={this.showPassword}><FontAwesomeIcon icon={faEye}/></div>
								<Link to="/forgotPassword" id="forgot">Forgot password?</Link>

								<button id="login" type="submit" value="Login">
									Login
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
										{facebookHelp && (
											<div className="alert alert-danger">{facebookHelp}</div>
										)}
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
					</div>

					<div id="newHere">
					New here?
					<Link to="/register">Signup</Link>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ loginUser, loginViaFacebook, loginViaGoogle, setAuthRedirectPath }
)(withRouter(Login));
