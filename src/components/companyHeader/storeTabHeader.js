import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class StoreTabHeader extends Component {
    state = {  }
    render() { 
        return ( 
            <div id="userTab">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-0"></div>
                    <div className="col-md-9 col-sm-12">
                    <ul className="nav nav-tabs" role="tablist">
                          <li role="presentation" id="noDropdown"><a className="active" href="#overview" role="tab" data-toggle="tab">Overview</a></li>

                          <li role="presentation" className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Coupons
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a href="#activeCoupons" role="tab" data-toggle="tab">View Active Coupons <br/></a>
                            <a href="#inactiveCoupons" role="tab" data-toggle="tab">View Inactive Coupons<br/></a>
                            <Link to="/addCoupons">Add Coupons<br/></Link>
                            </div>
                          </li>

                          <li role="presentation" className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Deals
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a href="#activeDeals" role="tab" data-toggle="tab">View Active Deals<br/></a>
                            <a href="#inactiveDeals" role="tab" data-toggle="tab">View Inactive Deals<br/></a>
                            <Link to="/addDeal">Add Deals<br/></Link>
                            </div>
                          </li>

                          <li role="presentation"className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Settings
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                  <a href="#basicInfo" role="tab" data-toggle="tab">Basic Information<br/></a>
                                  <a href="#companyInfo" role="tab" data-toggle="tab">Company Information<br/></a>
                                  <a href="#edit" role="tab" data-toggle="tab">Change Password<br/></a>
                                </div>
                           </li>

                          
                          </ul>
                    </div>
                </div>
            </div>
        </div>
         ); 
    }
}
 
export default StoreTabHeader;