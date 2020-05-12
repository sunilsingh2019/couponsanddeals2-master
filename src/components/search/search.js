import React, { Component } from 'react';
import style from './search.css'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchSide extends Component {

    render() { 
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="text/css" href={style}/>
                {/* <form> */}
                    <div  id="searchSide">
                        <h5 className="searchTitle">Filter</h5>
                        <div id="searchDiv">
				    		<FontAwesomeIcon id="blendedSearch" icon={faSearch} />
                            <input id="search" placeholder="Search"
                            value={this.props.value}
                            onChange={this.props.change} 
                            onKeyDown={this.props.handleSearch}/>
				    	</div>
                    </div>
                {/* </form> */}
            </React.Fragment>
         );
    } 
}
 
export default SearchSide;