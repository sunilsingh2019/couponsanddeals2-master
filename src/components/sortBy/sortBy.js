import React, { Component } from 'react';

class SortBy extends Component {
    state = { 
        choices:[
            {value:"a2z", text:"A-Z"},
            {value:"z2a", text:"Z-A"}
        ]
     }
    render() { 
        return (  
            <React.Fragment>
            <div id="sortBy">
                <h5 className="searchTitle">Sort By</h5>
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
  
export default SortBy;