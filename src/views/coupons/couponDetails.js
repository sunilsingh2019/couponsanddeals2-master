import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CheckLoggedIn } from '../../components/common/checkLoggedIn';
import { getCouponBySlug, couponIsViewed } from '../../actions/couponAction';
import { setAuthRedirectPath } from '../../actions/authActions';
import Spinner from '../../components/spinner/spinner';
import axios from '../../api/axiosInstance';
import html2canvas from 'html2canvas'; 
import jsPDF from 'jspdf';

import CouponFeed from '../../components/coupon/couponFeed4';
import SimpleHeader from '../../components/companyHeader/simpleHeader';

import { claimCouponAPI, couponDetailAPI, couponViewedAPI } from '../../api/apiURLs';
import ShareOnFb from '../../components/sharingButton/shareOnFb';

class CouponDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			loggedIn: false,
			errorHelp: false,
			errorMessage: '',
			couponQRLoading: false,
			coupon: {},
			isClaimed: false,
			claimCouponQr: '',
			qrNumber: '',
			totalViewed: 0,
			relatedCoupons: [],
			slug:this.props.match.params.slug
		};
	}

	componentDidMount() {
		this.setState({ loggedIn: CheckLoggedIn() });
		this.getCouponDetail(this.state.slug);
		this.couponIsViewed(this.state.slug);
	}

	componentWillUpdate(nextProps){
		if (nextProps.match.params.slug !== this.state.slug) {
			this.setState({
				slug:nextProps.match.params.slug, 
				isClaimed:false, 
				errorHelp:false, 
				isLoading:true,
				claimCouponQr: '',
				errorMessage: '',
				qrNumber: ''},()=>{
				this.getCouponDetail(this.state.slug)
				this.couponIsViewed(this.state.slug)
			})
		}
	  }

	couponIsViewed = slug => {
		axios
			.get(couponViewedAPI(slug))
			.then(res => {
				console.log(res.data);
				let totalViewed = this.state.totalViewed + 1;
				this.setState({
					totalViewed: totalViewed,
				});
			})
			.catch(err => console.log(err));
	};

	getCouponDetail = slug => {
		axios
			.get(couponDetailAPI(slug))
			.then(res => {
				document.title="Deals | "+res.data.data.title
				console.log(res);
				this.setState({
					isLoading: false,
					coupon: res.data.data,
					totalViewed: res.data.data.views,
					relatedCoupons: res.data.related,
				});
			})
			.catch(err => {
				this.props.history.push('/not-found');
			});
	};

	claimCoupon = () => {
		this.setState({
			couponQRLoading: true,
		});
		const access_token = window.localStorage.getItem('access_token');
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${access_token}`,
		};
		axios
			.post(claimCouponAPI(this.state.slug), {}, { headers: { ...headers } })
			.then(res => {
				console.log("claimed", res.data)
				if (res.data.status === true) {
					this.setState({
						isClaimed: true,
						couponQRLoading: false,
						claimCouponQr: res.data.data.qr_image,
						qrNumber: res.data.data.qr_token,
					});
					// this.props.history.push('/claim-coupon/' + res.data.data.qr_token);
				} else {
					this.setState({
						couponQRLoading: false,
						isClaimed: false,
						errorHelp: true,
						errorMessage: res.data.error,
					});
				}
			})
			.catch(err => {
				// console.log(err);
				// alert(err.data);
				// alert(err);
				// alert(err.data.error);
				this.setState({
					couponQRLoading: false,
					errorHelp: true,
					errorMessage: err.data.error,
				});
			});
	};

	download = qrImage => {
		alert(qrImage);
		const url = window.URL.createObjectURL(new Blob([qrImage]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'file.png'); //or any other extension
		document.body.appendChild(link);
		link.click();
		link.remove();
	};
	redirectLoginPageWithIntendedUrl = () => {
		this.props.setAuthRedirectPath(this.props.match.url);
		this.props.history.push('/login');
	};
	close() {
		document.getElementById('popUp').style.display = 'none';
	}

	render() {
		console.log(this.state)
		const {
			coupon,
			isLoading,
			isClaimed,
			claimCouponQr,
			qrNumber,
			couponQRLoading,
			errorHelp,
			errorMessage,
			totalViewed,
		} = this.state;
		const {
			title,
			valid,
			offer_title,
			details,
			// banner,
			// created_at,
			// updated_at,
			// store_url,
			// store_logo,
			// category_title,
			// slug,
			// views,
		} = coupon;
		
		const url = window.location.href;
		// const url = 'https://www.google.com'

		let claimStatusPopup, relatedCoupons;

		let detailContent = (
			<div id="spinnerWrap">
				<Spinner />
			</div>
		);

		let claimStatus = (
			<div id="spinnerWrap">
				<Spinner />
			</div>
		);

		if (!couponQRLoading) {
			if (isClaimed) {
				claimStatusPopup = (
					<React.Fragment>
						<div id="popUp">
							<a href="javascript:void(0)" id="closebtn" onClick={this.close}>
								&times;
							</a>
							<div id="popUpCenter">
								<div id="divToPrint">
									<img src={claimCouponQr} />
								</div>
								<button
									id="downloadButton"
									onClick={() => this.download(claimCouponQr)}
									className="btn btn-primary"
								>
									Download pdf
								</button>
							</div>
						</div>
					</React.Fragment>
				);
				claimStatus = (
					<React.Fragment>
						<button id="claim">Coupon Claimed!!</button>
					</React.Fragment>
				);
			} else {
				claimStatus = (
					<React.Fragment>
						{this.state.loggedIn && (
							<button id="claim" onClick={() => this.claimCoupon()}>
								Claim coupon
							</button>
						)}
						{/* for not logged in users */}
						{!this.state.loggedIn && (
							<button id="claim" onClick={() => this.redirectLoginPageWithIntendedUrl()}>
								Please Login
							</button>
						)}
					</React.Fragment>
				);
			}
		}

		if (!isLoading) {
			relatedCoupons = (
				<div id="relatedCoupons">
					<div className="container">
						<SimpleHeader title="Coupons you may like" />
						<CouponFeed coupons={this.state.relatedCoupons} />
					</div>
				</div>
			);

			detailContent = (
				<React.Fragment>
					{claimStatusPopup}
					<div className="container">
						<div id="claimCouponDiv">
							<div className="row">
								<div className="padd col-md-8 col-sm-12">
									<h1>{title}</h1>
									<h2>{offer_title}</h2>
									<h3>
										<FontAwesomeIcon icon={faClock} /> Valid Till {valid.end_valid}
									</h3>
									<h5>
										<span>{totalViewed} </span>viewed today
									</h5>
								</div>

								<div className="col-md-4 col-sm-12 needsHeight">
									<div id="zigzag">
										<div id="insideZigzag">{claimStatus}</div>
									</div>
									{errorHelp && <div className="alert alert-danger">{errorMessage}</div>}
								</div>
							</div>
						</div>

						<div id="description">
							<h4>Descriptions:</h4>
							{details}
							<br/>
							<ShareOnFb url={url}/>
						</div>
					</div>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<div id="couponDetailPage">{detailContent}</div>
				{relatedCoupons}
			</React.Fragment>
		);
	}
}

CouponDetails.propTypes = {
	getCouponBySlug: PropTypes.func.isRequired,
	couponIsViewed: PropTypes.func.isRequired,
	coupons: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	coupons: state.coupons,
	errors: state.errors,
	auth: state.auth,
});

export default withRouter(
	connect(
		mapStateToProps,
		{ getCouponBySlug, couponIsViewed, setAuthRedirectPath }
	)(CouponDetails)
);
