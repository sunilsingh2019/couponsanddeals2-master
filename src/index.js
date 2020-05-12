import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//ReactDom.render(<Deals />,document.getElementById('root'));
 //ReactDom.render(<Home />,document.getElementById('root'));
//ReactDom.render(<CouponsPage />,document.getElementById('root'));
//ReactDom.render(<Login />,document.getElementById('root'));
//ReactDom.render(<Register />,document.getElementById('root'));

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// import React from 'react';
// import ReactDom from 'react-dom';
// import Deals from './views/deals/deals';
// import Home from './views/home/home';
// import CouponsPage from './views/coupons/couponsPage';
// import Login from './views/login/login';
// import Register from './views/register/register';

// import "bootstrap/dist/css/bootstrap.css";

// //ReactDom.render(<Deals />,document.getElementById('root'));
//  //ReactDom.render(<Home />,document.getElementById('root'));
// //ReactDom.render(<CouponsPage />,document.getElementById('root'));
// ReactDom.render(<Login />,document.getElementById('root'));
// //ReactDom.render(<Register />,document.getElementById('root'));
