import React, { Component } from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../../components/spinner/spinner';
import style from './forgot.css'

import {forgotPasswordAPI} from '../../api/apiURLs'
import axios from '../../api/axiosInstance';
import isEmpty from '../../validation/isEmpty';

class ForgotPassword extends Component {
    state = { 
        profile:{
            email:''
        },
        isLoading:false,
        errors:[], 
        response:{},
        sucess:false
    }

    handleChange = e => {
        const profile = { ...this.state.profile };
        profile[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ profile });
    };

    handleSubmit=(e)=>{
        e.preventDefault(); 
        this.setState({
          isLoading:true
        }) 
        axios({
			method: 'post',
			url: forgotPasswordAPI,
			data: this.state.profile
		})
		.then(response => {
            this.setState({isLoading:false})
            console.log(response.data);
            if (response.data.status === true) {
              this.setState({response:response.data, sucess:true})
              var win = window.open('/reset-password', '_blank');
                win.focus();
            }else{
                this.setState({response:response.data, errors:response.data.error})
            }
        })
		.catch(error => {
            this.setState({isLoading:false})
				console.log(error);
			});
    }

    render() { 
        const {profile, sucess, isLoading, response, errors}=this.state
        let errorContent
        if (isLoading){
          return(
            <div id="spinnerWrap">
              <Spinner/>
            </div>
          )
        }

        errorContent=<p>Enter the verification code we sent through.</p>
        if (!isEmpty(response)){
            if (response.status===false) errorContent=<div className="alert alert-danger">{errors}</div>
        }

        if (sucess){
            return(
              <div id="changePasswordSucess">
                <div className="container">
                  <h1 className="display-4"><FontAwesomeIcon icon={faCheckCircle}/></h1>
                  <div className="alert alert-success" role="alert">
                    {/* {response.message-detail} */}
                    Password reset email sent
                  </div>
                </div>
              </div>
            )
        }

        return ( 
        <React.Fragment>
            <link rel="stylesheet" type="text/css" href={style}/>
            <div className="forgotP" id="editProfileDiv">
                <div id="forgotPasswordPage">
                {errorContent}
                <form>
                    <label htmlFor="old_password">Enter your Email</label>
						<input
							value={profile.email}
							className="form-control"
							name="email"
							type="text"
							onChange={this.handleChange}
						/>
                  <button type="submit" onClick={this.handleSubmit}>Submit</button>
                </form>
                </div>
            </div>
        </React.Fragment>
         );
    }
}
 
export default ForgotPassword;