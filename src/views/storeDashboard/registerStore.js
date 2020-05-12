import React, { Component } from 'react';import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import {readFile} from 'fs'

import { registerStore } from '../../actions/storeDashboardActions';
import { getAllCategories } from '../../actions/categoryActions';
import Spinner from '../../components/spinner/spinner'

import FormInput from '../../components/common/formInput'
import MainHeader from '../../components/companyHeader/loginHeader'
import isEmpty from '../../validation/isEmpty'

class RegisterStore extends Component {
    constructor(){
        super();
        this.state = { 
            newStore:{
                name:'',
                detail:'',
                logo:'',
                contact_number:'',
                website_url:'',
                city:'',
                address:''

            },
            errors:[],
            bannerName:''
         }
    }
        
     
         componentWillReceiveProps(nextProps) {
            if(this.props.errors !== nextProps.errors){
                this.setState({
                    errorHelp: true
                })
            }
        }

    
    handleSubmit = e => {
		e.preventDefault();     
        const newStore = {
            name:this.state.newStore.name,
            detail:this.state.newStore.detail,
            logo:this.state.newStore.logo,
            contact_number:this.state.newStore.contact_number,
            website_url:this.state.newStore.website_url,
            city:this.state.newStore.city,
            address:this.state.newStore.address
         };
         console.log(newStore)
        this.props.registerStore(newStore);
    };

    handleChange = e => {
		const newStore = { ...this.state.newStore };
		newStore[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ newStore });
        console.log(newStore)
    };

    logoChange=e=>{
        let files = e.target.files || e.dataTransfer.files;
        console.log("file name",e.target.files[0])
        if (!files.length) return;
        this.setState({bannerName:e.target.files[0]})
        this.createImage(files[0]);
    }

    createImage=(file)=> {
        const newStore = { ...this.state.newStore };
        let reader = new FileReader();
        console.log("reader",reader)
		reader.onload = e => {
            newStore['logo']=e.target.result
			this.setState({
				newStore
			});
		};
		reader.readAsDataURL(file);
	}
    

    componentDidMount(){
        this.props.getAllCategories()
    }
    
    render() { 
        console.log(this.props) 
        let categoryOption,bannerStatus

        if (!this.state.newStore.logo){
            bannerStatus="No Logo Selected"
        }else{
            bannerStatus=this.state.bannerName.name
        }
        
        const {categories, categoriesLoading}=this.props.categories
            if (categoriesLoading || isEmpty(categories)){
                categoryOption=<div id="spinnerWrap"><Spinner/></div>
            }else{
                categoryOption=
                <React.Fragment>
                    <label>Categories:</label>
                    <select name="category_id" onChange={this.handleChange} id="selectPackage">
                        <option value="">--Please choose an option--</option>
                        {categories.data.map(category=>(
                            <option name={category.name} key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </React.Fragment>
             }
        return (
            <React.Fragment>
                <div id="registerStore">
                    <div id="registerStoreDiv">
                    <MainHeader title={"Register Store"}/>
                    <form>
                       <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <FormInput
                            type="text"
                            value={this.state.newStore.name} 
                            title="Name"
                            change={this.handleChange}
                            name="name"
                            errors={this.state.errors}/>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <FormInput
                            type="text"
                            value={this.state.newStore.contact_number} 
                            title="Contact Number"
                            change={this.handleChange}
                            name="contact_number"
                            errors={this.state.errors}/> 
                        </div>

                        <div className="col-md-6 col-sm-12">
							<div className="form-group">
								<label htmlFor="banner">Logo
								<div id="customInput">Select File</div>
								</label>
								<input onChange={this.logoChange}
									value={null}
									type="file"
									id="banner"
									name="banner" className="form-control noBG"/>
									<span id="bannerStatus">{bannerStatus}</span>
							</div>
						</div>

                        <div className="col-md-6 col-sm-12">
                            <FormInput
                            type="text"
                            value={this.state.newStore.website_url} 
                            title="Website"
                            change={this.handleChange}
                            name="website_url"
                            errors={this.state.errors}/> 
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <FormInput
                            type="text"
                            value={this.state.newStore.city} 
                            title="City"
                            change={this.handleChange}
                            name="city"
                            errors={this.state.errors}/>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <FormInput
                            type="text"
                            value={this.state.newStore.address} 
                            title="Address"
                            change={this.handleChange}
                            name="address"
                            errors={this.state.errors}/>
                        </div>
                       </div> 

                       {categoryOption}

                       <div className="form-group">
                            <label htmlFor="detail">Descriptions</label>
                            <textarea onChange={this.handleChange}
                                value={this.state.newStore.detail}
                                name="detail" row="5" className="form-control"/>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <button id="create" type="submit" onClick={this.handleSubmit}>CREATE</button> 
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div id="cancel">CANCEL</div>
                            </div>
                        </div>

                    </form>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
RegisterStore.propTypes = {
	registerStore: PropTypes.func.isRequired,
	dashboard: PropTypes.object.isRequired,
	getAllCategories: PropTypes.func.isRequired,
	categories: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    dashboard: state.dashboard,
    errors: state.errors,
    categories: state.categories,
});

export default connect(
	mapStateToProps,
	{ registerStore, getAllCategories }
)(RegisterStore);