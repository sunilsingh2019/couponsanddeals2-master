import React, { Component } from 'react';
import SimpleHeader from '../../components/companyHeader/simpleHeader'
import { faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../../components/spinner/spinner';

import {resetPasswordAPI} from '../../api/apiURLs'
import axios from '../../api/axiosInstance';
import isEmpty from '../../validation/isEmpty';

class ResetPassword extends Component {
    state = { 
        config:{
            email:'',
            code:'',
            password:'',
            confirm_password:''
        },
        isLoading:false,
        errors:[],
        response:{},
        sucess:false
     }

     handleChange = e => {
        const config = { ...this.state.config };
        config[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ config });
    };

    hasErrorFor = field => {
        return !!this.state.errors[field]; 
      };
    
    renderErrorFor = field => {
      if (this.hasErrorFor(field)) {
        return (
          <span className="invalid-feedback">
            <strong className="strongErrorMsg">{this.state.errors[field][0]}</strong>
          </span>
        );
      }
    };

    handleSubmit=e=>{
        e.preventDefault(); 
        this.setState({
          isLoading:true
        }) 
        axios({
			method: 'post',
			url: resetPasswordAPI,
			data: this.state.config
		})
		.then(response => {
            this.setState({isLoading:false})
            console.log(response.data);
            if (response.data.status === true) {
                this.setState({response:response.data, sucess:true})
			    this.props.history.push("/login");
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
        const {config, sucess, isLoading, response, errors, codeState}=this.state
        let errorContent
        if (isLoading){
          return(
            <div id="spinnerWrap">
              <Spinner/>
            </div>
          )
        }

        return(
            <div id="editProfileDiv">
            <SimpleHeader title={"Reset Password"}/>
              <form>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <label htmlFor="code">Confirmation Code</label>
						 <input
						 	value={config.code}
						 	className={`form-control ${this.hasErrorFor('code') ? 'is-invalid' : ''}`}
						 	name="code"
						 	type="text"
						 	onChange={this.handleChange}
						 />
						{this.renderErrorFor('code')}
                    </div>

                  <div className="col-md-6 col-sm-12">
                    <label htmlFor="email">Email Address</label>
						 <input
						 	value={config.email}
						 	className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
						 	name="email"
						 	type="text"
						 	onChange={this.handleChange}
						 />
						{this.renderErrorFor('old_password')}
                    </div>

                    <div className="col-md-6 col-sm-12">
                      <label htmlFor="password">Password</label>
						<input
							value={config.password}
							className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
							name="password"
							type="password"
							id="password"
							onChange={this.handleChange}
						/>
						{this.renderErrorFor('password')}
                    </div>

                    <div className="col-md-6 col-sm-12">
                      <label htmlFor="confirm_password">Confirm Password</label>
						<input
							value={config.confirm_password}
							className={`form-control ${this.hasErrorFor('confirm_password') ? 'is-invalid' : ''}`}
							name="confirm_password"
							type="password"
							id="confirm_password"
							onChange={this.handleChange}
						/>
						{this.renderErrorFor('confirm_password')}
                    </div>
                  </div>
                  <button type="submit" onClick={this.handleSubmit}>Submit</button>
                </form>
              </div>
            )
        }
    }

 
export default ResetPassword;