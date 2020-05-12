import React, { Component } from 'react';
import RelatedOffers from './relatedOffers';

class RelatedOffersFeed extends Component {
    render() { 
        const {offers}=this.props
        return ( 
            <React.Fragment>
                <div className="row">
                    {offers.map((offer,i)=>(
                        <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                            <RelatedOffers offer={offer}/>
                        </div>
                    ))}
                </div>
            </React.Fragment>
         );
    }
}
 
export default RelatedOffersFeed;