import React, { Component } from 'react';

class LoginHeader extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div id="loginHeader">
                    <h1>{this.props.title}</h1>
                </div>
            </React.Fragment>
         );
    }
}
 
export default LoginHeader;