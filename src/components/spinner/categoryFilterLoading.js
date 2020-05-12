import React, { Component } from 'react';
import Spinner from './spinner'

class CategoryFilterLoading extends Component {
    state = {  }
    render() { 
        return ( 
            <div id="sortCategory">
                    <h5 className="searchTitle">Categories</h5>
                    <form>
                    <Spinner/>
                    </form>
                </div>
         );
    }
}
 
export default CategoryFilterLoading;