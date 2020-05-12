import React, { Component } from 'react';

class FilterBy extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
            <div id="sortBy">
                <h6>Filter By</h6>
                <p><input type="radio" name="filterBy" value="all"/> All</p>
                <p><input type="radio" name="filterBy" value="open"/> Open</p>
                <p><input type="radio" name="filterBy" value="closed"/> Closed</p>
            </div>
            </React.Fragment>
         );
    }
}
 
export default FilterBy;