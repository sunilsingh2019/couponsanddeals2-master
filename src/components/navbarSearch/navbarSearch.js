import React, { Component } from 'react';
import style from './navbarSearch.css';
import { Link, withRouter } from 'react-router-dom';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { QueryString } from '../../helpers';

class NavbarSearch extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.state = { 
			query: '',
			width:''
		}; 
	}

	handleInputChange = () => {
		this.setState({
			query: this.search.value,
		});
	};

	submit = e => {
		let query = QueryString(this.state.query);
		if (e.key === 'Enter') {
			document.getElementById("overlaySearch").style.display="none"
			var x= document.getElementsByClassName("hideThis")
			for(var i=0; i<x.length; i++){
        		x[i].style["color"] = "#b0b2bb";
    		}
			this.props.history.push('/browse?search=' + query);
		}
	};	

	componentWillMount() {	
		document.addEventListener('mousedown', this.handleClick, false);
		this.updateDimensions();
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClick, false);
        window.removeEventListener("resize", this.updateDimensions);
	}

	updateDimensions=()=> {
		let width=window.innerWidth
        this.setState({width});
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

	handleClick = e => {
		if (!this.node.contains(e.target)) {
			this.handleClickOutSide();
			return;
		}
	};

	handleClickOutSide() {
		document.getElementById("overlaySearch").style.display="none"
		var x= document.getElementsByClassName("hideThis")
		for(var i=0; i<x.length; i++){
        	x[i].style["color"] = "#b0b2bb";
    	}
		this.setState({
			query: '',
		});
	}

	handleOverlay=()=>{
		document.getElementById("overlaySearch").style.display="block"
		var x= document.getElementsByClassName("hideThis")
		for(var i=0; i<x.length; i++){
        	x[i].style["color"] = "#1d1e223d";
    	}
	}

	render() {
		let searchContent
		if (this.state.width<992){
			searchContent=
				<div id="navbarSearch" ref={node => (this.node = node)}>
					<Link to="/browse?search=">
					<label id="smallScreenSearch" htmlFor="search">
						<FontAwesomeIcon icon={faSearch} />
					</label>
					</Link>
				</div>
		}else{
			searchContent=
			<div id="navbarSearch" ref={node => (this.node = node)}>
				<input
					id="searchInputField"
					name="search"
					placeholder="Search"
					value={this.state.query}
					ref={input => (this.search = input)}
					onChange={this.handleInputChange}
					onKeyDown={this.submit}
					onClick={this.handleOverlay}
				/>
				<label htmlFor="search">
					<FontAwesomeIcon icon={faSearch} />
				</label>
			</div>
		}
		return (
			<React.Fragment>
				<link ref="stylesheet" type="css" href={style} />
				<div id="overlaySearch"></div>
				{searchContent}
			</React.Fragment>
		);
	}
}

// vvi dont forget withRouter
export default withRouter(NavbarSearch);
