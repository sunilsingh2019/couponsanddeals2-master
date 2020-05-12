import React, { Component } from 'react';

class TabHeader extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div className="container">
					<div className="row">
						<div className="col-md-3 col-sm-0"></div>
						<div className="col-md-9 col-sm-12">
							<ul className="nav nav-tabs" role="tablist">
  						  {/* <li className="noDropdown" role="presentation"><a href="#all" role="tab" data-toggle="tab" className="active">All ({this.props.deal+this.props.coupon})</a></li> */}
  						  <li className="noDropdown" role="presentation"><a href="#deals" role="tab" data-toggle="tab" className="active">Deals ({this.props.deal})</a></li>
  						  {/* <li className="noDropdown" role="presentation"><a href="#coupons" role="tab" data-toggle="tab">Coupons ({this.props.coupon})</a></li> */}
  						</ul>
						</div>
					</div>
				</div>
            </React.Fragment>
         );
    }
}
 
export default TabHeader;