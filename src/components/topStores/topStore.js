import React, { Component } from 'react';
import style from './topStore.css';
import s1 from '../../assets/images/stores/amazon.PNG'
import { Link } from 'react-router-dom';
class TopStore extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="text/css" href={style}/>
                <Link to={"/stores/"+this.props.TStore.slug}>
                <div id="topStoreComp">
                    <span className="helper"></span>
                    <img alt="" id="storeImg" src={this.props.TStore.logo}/>
                </div>
                </Link>
            </React.Fragment>
         );
    }
}
 
export default TopStore;