import React, { Component } from 'react';
import logo from '../../assets/images/stores/amazon.PNG'
import {Link} from 'react-router-dom'

class BigStore extends Component {
    
    render() {
        const colors=["#037cd5","#de2fcd","#e0f962","#0bd6bb","#037cd5","#de2fcd","#e0f962","#0bd6bb","#037cd5","#de2fcd","#e0f962","#0bd6bb","#037cd5","#de2fcd","#e0f962","#0bd6bb","#037cd5","#de2fcd","#e0f962","#0bd6bb","#037cd5","#de2fcd","#e0f962","#0bd6bb","#037cd5","#de2fcd","#e0f962","#0bd6bb","#037cd5","#de2fcd","#e0f962","#0bd6bb","#037cd5","#de2fcd","#e0f962","#0bd6bb","#037cd5","#de2fcd","#e0f962","#0bd6bb","#037cd5","#de2fcd","#e0f962","#0bd6bb"]
        const style={
            backgroundColor:colors[this.props.index]
        }
        const {store}=this.props
        return (  
            <React.Fragment>
            <Link to={"/store/"+store.slug}>
                <div id="bigStore" style={style}>
                    <div id="featured">
                        {store.name} 
                    </div>
                    <div id="imgDiv">
                        <span className="helper"></span>
                        <img src={store.logo} />
                    </div>
                    <div id="couponsBox">{store.coupon_count} Coupons | {store.deal_count} offers</div>
                </div>
            </Link>
            </React.Fragment>
         );
    }
}
 
export default BigStore;