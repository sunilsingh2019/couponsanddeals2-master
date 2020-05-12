import React, { Component } from 'react';
import CouponNew from './couponUserProfile';

class CouponFeedProfile extends Component {
    constructor(){
        super()
        this.state={
            image:'',
            name:''
        }
    }

    open=(image,name)=>{
        this.setState({
            image:image,
            name:name
        },()=>{
            document.getElementById("popUpProfile").style.display="block"
        })
    }
    close(){
		document.getElementById("popUpProfile").style.display="none"
      }
      
    render() { 
        // console.log(this.state)
        const {coupons}=this.props
        return ( 
            <React.Fragment>
                
                <div id="popUpProfile">
                    <a href="javascript:void(0)" id="closebtn" onClick={this.close}>&times;</a>
                    <div id="popUpCenter">
                        {this.state.name}<br/>
                        <img src={this.state.image} alt=""/>    
                    </div> 
                </div>

                <div className="row">
					{coupons.map((coupon,i) => (
						<div key={i} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                            <CouponNew openClick={this.open} coupon={coupon}/>
                        </div>
					))}
					</div>
            </React.Fragment>
         );
    }
}
 
export default CouponFeedProfile;