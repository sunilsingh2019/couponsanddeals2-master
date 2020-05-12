import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './deal.css';

class DealItem extends Component {
	render() {
		const { deal, slug, image, description, price, oldPrice, offPercentage } = this.props;
		
		return (
			<React.Fragment>
			<Link to={`/deals/${slug}`}>
				<div id="dealItemPage" className="card">
					<h6 id="h6">{deal}</h6>
					<div id="appearOnHover">
						<h6>{deal}</h6>
						<div id="offPercent">
							{offPercentage} % OFF!
						</div>
						<div id="description">
							{description}
						</div>
					</div>
					
					<div id="cardImgDiv">
						<span className="helper" />
						<img alt="" src={image} className="card-img-top" id="productImg" />
					</div>
					
					<div className="card-body cardBodyProduct">
						<div id="priceDiv"> 
							<h3>{deal}</h3>
							<h5>
							<span id="sale">Rs.{oldPrice}</span>
								Rs.{price}
							
							</h5>
						</div>
					</div>
				</div>
			</Link>
			</React.Fragment>
		);
	}
}

export default DealItem;
