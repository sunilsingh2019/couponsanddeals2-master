import React, { Component } from 'react';
// import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import axios from '../../api/axiosInstance';

import { viewClaimedCouponAPI } from '../../api/apiURLs';

class ClaimCouponPage extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			qr_image: '',
			error: '',
		};
	}
	printDocument() {
		const input = document.getElementById('divToPrint');
		html2canvas(input).then(canvas => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF();
			pdf.addImage(imgData, 'JPEG', 0, 0);
			pdf.save('download.pdf');
		});
	}

	componentDidMount() {
		console.log(this.props);
		axios
			.get(viewClaimedCouponAPI(this.props.match.params.qr_token))
			.then(res => {
				if (res.data.status === true) {
					this.setState({
						isLoading: false,
						qr_image: res.data.data.qr_image,
					});
				} else {
					this.setState({
						isLoading: false,
						error: res.data.error,
					});
				}
			})
			.catch(err =>
				this.setState({
					isLoading: false,
					error: err.data.error,
				})
			);
	}

	render() {
		if (this.state.isLoading) {
			return <p>Is Loading Dude!!</p>;
		} else {
			return (
				<React.Fragment>
					<div id="divToPrint">
						{/* {coupon.title} */}
						<img src={this.state.qr_image} />
					</div>
					<button onClick={this.printDocument} className="btn btn-primary">
						Download pdf
					</button>
				</React.Fragment>
			);
		}
	}
}

export default ClaimCouponPage;
