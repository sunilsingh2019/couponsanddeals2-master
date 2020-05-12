import React, { Component } from 'react';

class SortCategory extends Component {
    
    render() { 
        // console.log(this.props)
        return (  
            <React.Fragment>
                <div id="sortCategory">
                    <h5 className="searchTitle">Categories</h5>
                    <form>
                    <p key={'all'}><input type="radio" name="sortCategory" 
                        value={'all'} key={'all'}
                        checked={this.props.checked==='all'}
                        onChange={this.props.change}/>All</p>
                    {this.props.choices.map(choice=>(
                        <p key={choice.id}><input type="radio" name="sortCategory" 
                        value={choice.id} key={choice.id}
                        checked={this.props.checked==choice.id}
                        onChange={this.props.change}/>{choice.name}
                        </p>
                    ))}
                    </form>
                </div>
            </React.Fragment>
         );
    }
}
 
export default SortCategory;