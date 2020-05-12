import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, role, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (!auth.isAuthenticated) {
				return <Redirect to="/login" />;
			}
			if (auth.isAuthenticated) {
				if (role && role.indexOf(auth.user.role) === -1) {
					return <Redirect to={{ pathname: '/' }} />;
				}
			}
			return <Component {...props} />;
		}}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
