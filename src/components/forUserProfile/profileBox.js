import React, { Component } from 'react';
import style from './forUser.css'

class ProfileBox extends Component {
    render() { 
        let image=require('../../assets/images/userProfile/'+this.props.image)
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="text/css" href={style}/>
                <div id="profileBox">
                    <div id="left">
                        <img src={image}/>
                    </div>

                    <div id="right">
                        <h1>{this.props.data}</h1>
                        <h2>{this.props.number}</h2>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default ProfileBox;