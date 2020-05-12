import React, { Component } from 'react';
import SimpleHeader from '../../components/companyHeader/simpleHeader'
import { faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../spinner/spinner';

import {changePasswordAPI} from '../../api/apiURLs'
import axios from '../../api/axiosInstance';

class EditUserProfile extends Component {
  constructor(){
    super();
    this.state = { 
      profile:{
          old_password:'',
          new_password:'',
          confirm_password:''
      },
      isLoading:false,
      errors:[],
      response:{},
      sucess:false
   }
  }

  changePassword = () => {
    this.setState({isLoading:true})
		const access_token = window.localStorage.getItem('access_token');
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${access_token}`,
		};
		axios({
			method: 'post',
			url: changePasswordAPI,
			data: this.state.profile,
			headers: { ...headers },
		})
			.then(response => {
        this.setState({isLoading:false})
        console.log(response.data);
        if (response.data.status === true) {
          window.localStorage.removeItem('access_token');
          this.setState({errors:{}, sucess:true})
          const { access_token } = response.data;
          window.localStorage.setItem('access_token', access_token);
        }

        if (!!response.data.error){
          this.setState({errors:response.data.error})
        }
      })
			.catch(error => {
        this.setState({isLoading:false})
				console.log(error);
			});
	};
    

    showPassword=()=>{
      var x = document.getElementById("old_password");
		    if (x.type === "password") {
		  	x.type = "text";
		  	document.getElementById("showPassword").style.color="#634099";
		    } else {
		  	x.type = "password";
		  	document.getElementById("showPassword").style.color="#b0b2bb";
		    }
      }
    showPasswordNew=()=>{
		  var x = document.getElementById("new_password");
		    if (x.type === "password") {
		  	x.type = "text";
		  	document.getElementById("showPasswordNew").style.color="#634099";
		    } else {
		  	x.type = "password";
		  	document.getElementById("showPasswordNew").style.color="#b0b2bb";
		    }
      }
    showPasswordCon=()=>{
		  var x = document.getElementById("confirm_password");
		    if (x.type === "password") {
		  	x.type = "text";
		  	document.getElementById("showPasswordCon").style.color="#634099";
		    } else {
		  	x.type = "password";
		  	document.getElementById("showPasswordCon").style.color="#b0b2bb";
		    }
    }
    
    handleChange = e => {
		  const profile = { ...this.state.profile };
		  profile[e.currentTarget.name] = e.currentTarget.value;
          this.setState({ profile });
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

    handleSubmit = e => {
      e.preventDefault(); 
      this.setState({
        isLoading:true
      }) 
		  const profile = {
          new_password:this.state.profile.new_password,
          old_password:this.state.profile.old_password,
          confirm_password:this.state.profile.confirm_password
        };
      this.setState({profile},()=>(
          this.changePassword()
      ))
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors && this.props.errors !== nextProps.errors) {
        this.setState({
          errors: nextProps.errors,
          isLoading: false,
        });
      }
    }

    render() { 
      const {profile, sucess, isLoading}=this.state
      if (isLoading){
        return(
          <div id="spinnerWrap">
            <Spinner/>
          </div>
        )
      }

      if (sucess){
        return(
          <div id="changePasswordSucess">
            <div className="container">
              <h1 className="display-4"><FontAwesomeIcon icon={faCheckCircle}/></h1>
              <div className="alert alert-success" role="alert">
                You sucessfully changed your password.
              </div>
            </div>
          </div>
        )
      }

      return ( 
        <React.Fragment>
          <div id="editProfileDiv">
            <SimpleHeader title={"Edit Profile"}/>
              <form>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <label htmlFor="old_password">Old Password</label>
						         <input
						         	value={profile.old_password}
						         	className={`form-control ${this.hasErrorFor('old_password') ? 'is-invalid' : ''}`}
						         	name="old_password"
						         	type="password"
						         	id="old_password"
						         	onChange={this.handleChange}
						         />
						          <div id="showPassword" onClick={this.showPassword}>
						           	<FontAwesomeIcon icon={faEye} />
						          </div>
						          {this.renderErrorFor('old_password')}
                    </div>
                         
                    <div className="col-md-6 col-sm-12"/>

                    <div className="col-md-6 col-sm-12">
                      <label htmlFor="new_password">New Password</label>
							          <input
							          	value={profile.new_password}
							          	className={`form-control ${this.hasErrorFor('new_password') ? 'is-invalid' : ''}`}
							          	name="new_password"
							          	type="password"
							          	id="new_password"
							          	onChange={this.handleChange}
							          />
							          <div id="showPasswordNew" onClick={this.showPasswordNew}>
							          	<FontAwesomeIcon icon={faEye} />
							          </div>
							          {this.renderErrorFor('new_password')}
                    </div>

                    <div className="col-md-6 col-sm-12">
                      <label htmlFor="confirm_password">Confirm Password</label>
							          <input
							          	value={profile.confirm_password}
							          	className={`form-control ${this.hasErrorFor('confirm_password') ? 'is-invalid' : ''}`}
							          	name="confirm_password"
							          	type="password"
							          	id="confirm_password"
							          	onChange={this.handleChange}
							          />
							          <div id="showPasswordCon" onClick={this.showPasswordCon}>
							          	<FontAwesomeIcon icon={faEye} />
							          </div>
							          {this.renderErrorFor('confirm_password')}
                    </div>
                  </div>
                  <button type="submit" onClick={this.handleSubmit}>Submit</button>
                </form>
              </div>
             </React.Fragment>
         );
    }
}
 
export default EditUserProfile;