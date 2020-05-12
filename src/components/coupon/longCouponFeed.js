import React, { Component } from 'react';
import LongCoupon from './longCoupon'

class LongCouponFeed extends Component {
    render() { 
        // console.log(this.props)
        const {data}=this.props
        return ( 
            <React.Fragment>
                {data.map((coupon,i)=>(
                    <LongCoupon key={i} coupon={coupon}/>
                ))}
            </React.Fragment>
         );
    }
}
 
export default LongCouponFeed;