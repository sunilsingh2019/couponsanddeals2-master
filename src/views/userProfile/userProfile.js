import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import style from './userProfile.css'

import { getUserDetails } from '../../actions/userAction';
import { getFollowedCategoreis } from '../../actions/categoryActions';
import { getFollowedStores } from '../../actions/storeActions';

import icon from '../../assets/images/user_icon.png'
import Spinner from '../../components/spinner/spinner'

import UserHeader from '../../components/companyHeader/forUserProfile/simpleHeader'
import TabHeader from '../../components/companyHeader/forUserProfile/userTabHeader'
import SimpleHeader from '../../components/companyHeader/simpleHeader'
import UserOverview from '../../components/forUserProfile/overviewUser';
import EditUserProfile from '../../components/forUserProfile/editProfile'
import FollowedStores from '../../components/forUserProfile/followedStores'
// import CouponFeed from '../../components/coupon/couponFeedProfile';
import CategoryBoxFeed from '../../components/categoryBox/categoryFeed4'

class UserProfile extends Component {
  componentDidMount() {
    document.title="Deals | User Profile"
      this.props.getUserDetails();
      this.props.getFollowedCategoreis();
      this.props.getFollowedStores();
   }
   
   componentWillUpdate(nextProps){
		if (!isEmpty(nextProps.user.userDetails)) document.title="Deals | "+nextProps.user.userDetails.user.name
	}

  render() { 
    let userContent
    
    //for userdetails and coupons
    const {userDetails, userLoading}=this.props.user
    const {followedCategories, categoriesLoading}=this.props.categories
    let categoryContent

    if (isEmpty(followedCategories) || categoriesLoading){
      categoryContent=<Spinner/>
    }else{
      categoryContent=
        <div className="row"><CategoryBoxFeed followedCategories={followedCategories.categories}/></div>
        if (followedCategories.categories.length<1) categoryContent=<p>No followed categories to show.</p> 
    }

    if (isEmpty(userDetails) || userLoading) {
        userContent=<div id="spinnerWrap"><Spinner/></div>
    } else {  
    const {name, email}=this.props.user.userDetails.user
    console.log(this.props.categories.followedCategories)
    userContent=
    <div id="userProfile">
      
      <UserHeader data={userDetails.user} />
      <TabHeader />

       <div id="profileTabContent">
					<div className="container">
						<div className="row">
							<div className="col-lg-3 col-md-12">
								<div id="imageDiv">
									<img src={icon}/>
								</div>
							</div> {/* left column containing search and image ends */}
            </div>

					<div className="tab-content">
  					  <div role="tabpanel" className="tab-pane active" id="overview">
								<UserOverview userDetails={userDetails}/>
							</div>

              {/* <div role="tabpanel" className="tab-pane" id="activeCoupons">
                <div className="row">
                   <div className="col-lg-3 col-md-0"/>
                   <div className="col-lg-9 col-md-12"><SimpleHeader title={"Active Coupons"}/></div>
                </div>
                <div className="row"><CouponFeed coupons={userDetails.valid_coupons}/></div>
							</div>

              <div role="tabpanel" className="tab-pane" id="inactiveCoupons">
                  <div className="row">
                   <div className="col-lg-3 col-md-0"/>
                   <div className="col-lg-9 col-md-12"><SimpleHeader title={"Inactive Coupons"}/></div>
                 </div>
                  <div className="row"><CouponFeed coupons={userDetails.old_coupons}/></div>
							</div> */}

              <div role="tabpanel" className="tab-pane" id="categories">
                <div className="row">
                  <div className="col-lg-3 col-md-0"/>
                   <div className="col-lg-9 col-md-12"><SimpleHeader title={"Followed Categories"}/></div>
                </div>
                {categoryContent}
							</div>

            <div role="tabpanel" className="tab-pane" id="stores">
                {/* <FollowedStores stores={userDetails.follow_stores}/> */}
                <FollowedStores stores={userDetails.follow_stores}/> 
						</div>

               <div role="tabpanel" className="tab-pane" id="editUsername">
								<EditUserProfile userDetails={userDetails}/>
						  </div>

          </div>

           </div>{/* container ends */}
				</div>{/* tab content ends */}
    
    </div>
    }
    // console.log(this.props.user)
    return ( 
        <React.Fragment>
            <link ref="stylesheet" type="text/css" href={style}/>
            {userContent}
        </React.Fragment>
     );
  } 
}
 
UserProfile.propTypes = {
  getUserDetails: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getFollowedCategoreis: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  getFollowedStores: PropTypes.func.isRequired,
	stores: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  categories:state.categories,
  stores:state.stores
});

export default connect(
	mapStateToProps,
	{ getUserDetails, getFollowedCategoreis, getFollowedStores }
)(UserProfile);