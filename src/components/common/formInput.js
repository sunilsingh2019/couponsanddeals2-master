import React, { Component } from 'react';

class FormInput extends Component {
    hasErrorFor = field => {
		return !!this.props.errors[field];
	};

	renderErrorFor = field => {
		if (this.hasErrorFor(field)) {
            console.log(this.props.errors[field][0])
			return (
				<div className="invalid-feedback1">
					<strong className="strongErrorMsg">{this.props.errors[field][0]}</strong>
                </div>
			);
		}
    };
    
    render() { 
        // console.log(this.props)
        return ( 
            <React.Fragment>
                <div className="form-group">
                    <label htmlFor={this.props.name}>{this.props.title}</label>
                    <input onChange={this.props.change}
                        value={this.props.value}
                        type={this.props.type}
                        id={this.props.name}
                        name={this.props.name} 
                        className={`form-control ${this.hasErrorFor(this.props.name) ? 'is-invalid' : ''}`}/>
                </div>
                {this.renderErrorFor(this.props.name)}
            </React.Fragment>
         );
    }
}
 
export default FormInput;