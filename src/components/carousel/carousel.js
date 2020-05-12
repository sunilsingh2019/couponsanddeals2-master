import React, { Component } from 'react';
import isEmpty from '../../validation/isEmpty'


import './carousel.css'; 

class CarouselClass extends Component {
	state = {  }
	render() { 
		// console.log(this.props)
		const {promotions}=this.props
		if (isEmpty(promotions)) return <h1>unavailable</h1>
		return ( 
			<React.Fragment>
				<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
				  <ol className="carousel-indicators">
				    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
						{promotions.map((item,index)=>(
							<li data-target="#carouselExampleIndicators" key={index} data-slide-to={index+1}></li>
						))}
				  </ol>
				  <div className="carousel-inner">
				    <div className="carousel-item active" data-interval="3000">
							<a href={promotions[0].url}>
								<img src={promotions[0].banner} className="d-block w-100" alt="..."/>
							</a>
				    </div>
				    {promotions.slice(1,promotions.length).map((item)=>(
							<div className="carousel-item" key={item.id} data-interval="3000">
							<a href={item.url}><img src={item.banner} className="d-block w-100" alt="..."/></a>
						  </div>
						))}
				  </div>
				  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
				    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
				    <span className="sr-only">Previous</span>
				  </a>
				  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
				    <span className="carousel-control-next-icon" aria-hidden="true"></span>
				    <span className="sr-only">Next</span>
				  </a>
				</div>
			</React.Fragment>
		 );
	}
}
 
export default CarouselClass;

