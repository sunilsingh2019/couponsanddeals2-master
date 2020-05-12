import React, { Component } from 'react';
import CategoryBox from './categoryBox';
import {Link} from 'react-router-dom' 

class CategoryFeed4 extends Component {
    render() { 
        const {followedCategories}=this.props

        return ( 
            <React.Fragment> 
                <div className="row">
                    {followedCategories.map((cat,i) => (
                        <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-6">
                            <Link to={"/category/"+cat.slug}><CategoryBox cat={cat}/></Link>
                        </div>
				    ))}
                </div>
            </React.Fragment>
         );
    }
}
 
export default CategoryFeed4;