import React, { Component } from 'react';
import style from './notFound.css';
import {Link} from 'react-router-dom'

class NotFound extends Component {
	render() { 
		return ( 
		<React.Fragment>
			<link ref="stylesheet" type="text/css" href={style}/>
			<div id="notfound">
				<div className="notfound">
					<div className="notfound-404">
						<h3>Oops! Page not found</h3>
						<h1><span>4</span><span>0</span><span>4</span></h1>
					</div>
					<h2>we are sorry, but the page you requested was not found</h2>
					<Link to="/">Go to Homepage</Link>
				</div>
			</div>
		</React.Fragment>
		 );
	}
}
 
export default NotFound;


