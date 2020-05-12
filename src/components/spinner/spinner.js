import React, { Component } from 'react';
import style from './spinner.css'

class Spinner extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <link ref="stylesheet" type="text/css" href={style}/>
                <div className="spinner"></div>
            </React.Fragment>
         );
    }
}
 
export default Spinner;