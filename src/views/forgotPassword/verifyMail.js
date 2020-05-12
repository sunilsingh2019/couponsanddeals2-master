import React, { Component } from 'react';
import style from './forgot.css'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../../components/spinner/spinner';

import {verifyMailAPI, resendVerificationAPI} from '../../api/apiURLs'
import axios from '../../api/axiosInstance';
import isEmpty from '../../validation/isEmpty';

class VerifyMail extends Component {
    state = { 
        profile:{
            email:'',
            code:''
        },
        account:this.props.location.state,
        isLoading:false,
        errors:[], 
        response:{},
        sucess:false,
        resend:false,
        errormsg:''
    }

    componentDidMount=()=>{
        if (this.state.account==undefined){
            this.props.history.push({
                pathname:"/register"
              })
        }else{
            let account={...this.state.account}
            account=this.state.account.account
            let profileFormat={
                email:account.email,
                code:''
            }
            this.setState({profile:profileFormat})
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault(); 
        this.setState({isLoading:true})
        this.verify()
    }

    verify=()=>{
        axios({
			method: 'post',
			url: verifyMailAPI,
			data: this.state.profile
		})
		.then(response => {
            this.setState({isLoading:false})
            console.log(response.data);
            if (response.data.status === true) {
              this.setState({response:response.data, sucess:true})
              var win = window.open('/login', '_blank');
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

    handleChange = e => {
        const profile = { ...this.state.profile };
        profile[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ profile });
    };

    handleResend=()=>{
        axios({
			method: 'post',
			url: resendVerificationAPI,
			data: this.state.profile
		})
		.then(response => {
            this.setState({isLoading:false})
            console.log(response.data);
            if (response.data.state===true){
            this.setState({resend:response.data})
            }else{
                this.setState({errormsg:response.data.error})
            }
        })
		.catch(error => {
            this.setState({isLoading:false})
				console.log(error);
			});
    }
    
    render() { 
        console.log(this.props.location.state)
        const {profile, isLoading, response, errors, sucess, resend}=this.state
        let errorContent, resendContent
        if (isLoading){
          return(
            <div id="spinnerWrap">
              <Spinner/>
            </div>
          )
        }

        errorContent=<p>Enter the verification mail we send via your email.</p>
        if (!isEmpty(response)){
            if (response.status===false) errorContent=<div className="alert alert-danger">{errors}</div>
        }

        if (this.state.errormsg==''){
            if (resend===false){
                resendContent=<p className="problem" onClick={this.handleResend}><a>Click here if you didnt receive an email.</a></p>
            }else{
                resendContent=<p className="alert alert-success">Verification mail resent.</p>
            }
        }else{
            resendContent=<p className="alert alert-danger">{this.state.errormsg}</p>
        }

        if (sucess){
            return(
              <div id="changePasswordSucess">
                <div className="container">
                  <h1 className="display-4"><FontAwesomeIcon icon={faCheckCircle}/></h1>
                  <div className="alert alert-success" role="alert">
                    {/* {response.message-detail} */}
                    Email has been verified. Login to continue.
                  </div>
                </div>
              </div>
            )
        }
        return ( 
            <React.Fragment>
                <link rel="stylesheet" type="text/css" href={style}/>
            <div className="forgotP" id="editProfileDiv">
                {resendContent}
                <div id="forgotPasswordPage">
                {errorContent}
                <form>
                    <label htmlFor="old_password">Verification Code</label>
						<input
							value={profile.code}
							className="form-control"
							name="code"
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
 
export default VerifyMail;