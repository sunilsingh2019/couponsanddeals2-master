import React, { Component } from 'react';

class SortByOffers extends Component {
    state = { 
        choices:[
            {value:"default", text:"All"},
            {value:"deals", text:"Deals"},
            {value:"coupons", text:"Coupons"}
        ]
     }
    render() { 
        return (  
            <React.Fragment>
            <div className="searchFor" id="sortBy">
                <h5 className="searchTitle">Search for</h5>
                <form>
                {this.state.choices.map(choice=>(
                    <p key={choice.value}><input type="radio" name="sortBy" 
                    value={choice.value} key={choice.value}
                    checked={this.props.checked===choice.value}
                    onChange={this.props.change}/>{choice.text}</p>
                ))}
                </form>
            </div>
            </React.Fragment>
         );
    }
}
  
export default SortByOffers;