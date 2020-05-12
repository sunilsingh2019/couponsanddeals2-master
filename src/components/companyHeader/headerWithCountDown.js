import React, { Component } from 'react';
import Countdown from 'react-countdown-now';

class HeaderWithCountDown extends Component {
    state = {  }
    render() { 
        // const renderer = ({ days, hours, minutes,seconds, completed }) => {
		// 	if (completed) {
		// 	  return <h6>Sorry the deal has Expired.</h6>
		// 	} else {
		// 	  return(
        //       <div>
		// 		    <span className="redBox">{hours}</span>:
		// 		    <span className="redBox">{minutes}</span>:
		// 		    <span className="redBox">{seconds}</span>
		// 	  </div>
		// 	  )
		// 	}
        //   }
          
        return ( 
            <React.Fragment>
                <div id="countHeader">
                    <div className="container">
                        <div id="featuredTitle">{this.props.title}</div>
                        {/* <div id="countDown">
                            Ends in:
                            <Countdown date={Date.now()+1000000000} renderer={renderer} />
                        </div> */}
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default HeaderWithCountDown;