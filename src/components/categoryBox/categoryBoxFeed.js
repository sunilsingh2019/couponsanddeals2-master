import React, { Component } from 'react';
import CategoryBox from './categoryBox';
import {Link} from 'react-router-dom' 

class CategoryBoxFeed extends Component {
    
    render() { 
        const {followedCategories}=this.props

        return ( 
            <React.Fragment>
                <div className="row">
                    {followedCategories.map((cat,i) => (
                        <div key={i} className="col-lg-2 col-md-3 col-sm-4 col-6">
                            <Link to={"/category/"+cat.slug}><CategoryBox cat={cat}/></Link>
                        </div>
				    ))}
                </div>
            </React.Fragment>
         );
    }
}

export default CategoryBoxFeed;