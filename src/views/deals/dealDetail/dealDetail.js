import React, { Component } from 'react';
import { dealDetailAPI, dealViewedAPI } from '../../../api/apiURLs';
import axios from '../../../api/axiosInstance';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { Helmet } from 'react-helmet';
import MetaTags from 'react-meta-tags';

import './dealDetail.css';

import SimpleHeader from '../../../components/companyHeader/simpleHeader';
import Spinner from '../../../components/spinner/spinner';
import DealFeed from '../../../components/deal/dealFeed';
import ShareOnFb from '../../../components/sharingButton/shareOnFb';

class DealDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true, 
			deal: {},
			relatedDeals: [],
			totalViewed: 0,
			slug: this.props.match.params.slug,
		};
	}
	componentDidMount() {
		if (this.state.slug) {
			this.getDealDetail(this.state.slug);
			this.dealIsViewed(this.state.slug);
		}
	}

	componentWillUpdate(nextProps) {
		if (nextProps.match.params.slug !== this.state.slug) {
			this.setState(
				{
					slug: nextProps.match.params.slug,
					isLoading: true,
				},
				() => {
					this.getDealDetail(this.state.slug);
					this.dealIsViewed(this.state.slug);
				}
			);
		}
	}

	dealIsViewed = slug => {
		axios
			.get(dealViewedAPI(slug))
			.then(res => {
				console.log(res.data);
				let totalViewed = this.state.totalViewed + 1;
				this.setState({
					totalViewed: totalViewed,
				});
			})
			.catch(err => console.log(err));
	};

	getDealDetail = slug => {
		axios
			.get(dealDetailAPI(slug))
			.then(res => {
				console.log(res);
				document.title = 'Deals | ' + res.data.data.title;
				this.setState({
					isLoading: false,
					deal: res.data.data,
					relatedDeals: res.data.related,
					totalViewed: res.data.data.views,
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		const { deal, isLoading, totalViewed, relatedDeals, slug } = this.state;
		const { title, sell_price, actual_price, banner, off_percentage, details, store_logo, deal_url } = deal;
		// const shareUrl = 'https://dokaan.com.np/p/creed-green-irish-tweet-perfume-for-men-dok-per-861-120ml';
		const shareUrl='http://128.199.214.172:3000/deals/'+slug
		const quote = 'GitHub';
		let relatedContent;

		// const url = window.location.href;
		const url =
			'http://128.199.214.172:3000/coupons/iste-tenetur-itaque-veniam-dolorem-dolor-minus-voluptatem-atque';

		let detailContent = (
			<div id="spinnerWrap">
				<Spinner />
			</div>
		);

		if (!isLoading) {
			relatedContent = (
				<div id="relatedDeals">
					<div className="container">
						<SimpleHeader title="Deals you might like" />
						<DealFeed deals={relatedDeals} />
					</div>
				</div>
			);
			detailContent = (
				<div id="dealDetailPage">
					<div id="sh">
						<div className="rowDeals">
							<SimpleHeader title={'Deals'} />
						</div>
					</div>

					<div className="container">
						<div id="dealWithImage">
							<div className="row">
								{/* <div className="col-lg-2 col-md-0 col-sm-0" /> */}
								<div className="col-lg-8 col-md-6 col-sm-12">
									<div id="imageDiv">
										<img alt="" src={banner} alt=" " />
										<div id="overImage">{title}</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6 col-sm-12">
									<div id="dealDetailDiv">
										<h1>
											<span>{off_percentage}%</span> OFF
										</h1>
										<h2>{title}</h2>
										<h3>Rs {sell_price}</h3>
										<h4>Rs{actual_price}</h4>
										<div id="logoDiv">
											<img alt="" src={store_logo} />
										</div>
										<div id="forA">
											<a href={deal_url}>visit website</a>
										</div>
										<h5>
											<span>{totalViewed}</span> viewed Today
										</h5>
										{/* <h6>Vaild Till {expired_at}</h6> */}
										<h3 />
									</div>
								</div>
							</div>
						</div>

						<div id="descriptionDiv">
							<h1>Descriptions:</h1>
							{details}
							<br />
							<FacebookShareButton
								url={shareUrl}
								quote={quote}
								className="Demo__some-network__share-button"
							>
								<FacebookIcon size={32} round />
							</FacebookShareButton>

							{/* <ShareOnFb url={url}/> */}
						</div>
					</div>

					{relatedContent}
				</div>
			);
		}

		return (
			<React.Fragment> 
				<MetaTags>
					<title>Page 1</title>
					<meta property="og:description" 	content="Some description." />
					<meta property="og:title" 			content="MyApp" />
					<meta property="og:image" 			content="http://128.199.214.172/deals-backend/image/featured/1.jpg" />
					<meta property="og:url"				content={shareUrl}/>
					<meta property="og:type"			content="article"/>
				</MetaTags>
				{detailContent}
			</React.Fragment>
		);
	}
}

export default DealDetail;
