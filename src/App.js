import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ScrollToTop from 'react-router-scroll-top';
import store from './store';
import { setCurrentUser, logoutUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.css';

import PrivateRoute from './components/common/privateRoute';

import Home from './views/home/home';
import Deals from './views/deals/deals';
import StoreDetails from './views/stores/storeDetail/storeDetail';
import Login from './views/login/login';
import Register from './views/register/register';
import CouponsPage from './views/coupons/coupons';
import StoresPage from './views/stores/stores';
import DealDetail from './views/deals/dealDetail/dealDetail';
import CouponDetails from './views/coupons/couponDetails';
import ClaimCoupon from './views/coupons/claimCoupon';
import UserProfile from './views/userProfile/userProfile';
import CategoryDetail from './views/categories/categoryDetail';
import SearchPage from './views/search/searchPage';
import RelatedOffersPage from './views/userProfile/relatedOffersPage';
import ChangePassword from './components/forUserProfile/editProfile';
import ForgotPassword from './views/forgotPassword/forgotPassword'
import ResetPassword from './views/forgotPassword/resetPassword'
import VerifyMail from './views/forgotPassword/verifyMail'
import CategoryPage from './views/categories/categories'

import Navbar2 from './components/navbar/navbar2';
import Footer from './components/footer/footer';
import NotFound from './components/notFound/notFound';

import subCategoryDetail from './views/categories/subCategoryDetail';

const access_token = window.localStorage.getItem('access_token');
const expires_at = window.localStorage.getItem('expires_at');
const User = JSON.parse(window.localStorage.getItem('user'));

if (access_token) {
	store.dispatch(setCurrentUser(User));
	const currentTime = new Date();
	const expiryTime = new Date(expires_at);
	if (expiryTime < currentTime) {
		store.dispatch(logoutUser());
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<ScrollToTop>
						<React.Fragment>
							<Navbar2 />
							<Route exact path="/" component={Home} />
							<Route exact path="/deals/:slug" component={DealDetail} />
							<Route exact path="/deals" component={Deals} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							{/* <Route exact path="/coupons" component={CouponsPage} />
							<Route exact path="/coupons/:slug" component={CouponDetails} />
							<Route exact path="/claim-coupon/:qr_token" component={ClaimCoupon} /> */}
							<Route exact path="/store/:slug" component={StoreDetails} />
							<Route exact path="/stores" component={StoresPage} />
							<Route exact path="/browse" component={SearchPage} />
							<Route exact path="/changePassword" component={ChangePassword}/>
							<Route exact path="/forgotPassword" component={ForgotPassword}/>
							<Route exact path="/reset-password" component={ResetPassword}/>
							<Route exact path="/verify-mail" component={VerifyMail}/>
							<Switch>
								<PrivateRoute exact path="/profile" component={UserProfile} />
							</Switch>
							<Switch>	
								<Route exact path="/category/:slug" component={CategoryDetail} />
							<Route exact path="/categories" component={CategoryPage}/>
							</Switch>
							<Switch>
								<Route exact path="/subcategory/:cat/:sub" component={subCategoryDetail} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/offers-just-for-you" component={RelatedOffersPage} />
							</Switch>
							<Route exact path="/not-found" component={NotFound} />
							<Footer />
						</React.Fragment>
					</ScrollToTop>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
