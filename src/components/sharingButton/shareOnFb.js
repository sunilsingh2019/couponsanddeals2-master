import React from 'react';
import style from './sharing.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const ShareOnFb = (props) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${props.url}`;
    return ( 
        <React.Fragment>
            {/* <meta property="og:url"                content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
            <meta property="og:type"               content="article" />
            <meta property="og:title"              content="When Great Minds Don’t Think Alike" />
            <meta property="og:description"        content="How much does culture influence creative thinking?" />
            <meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" /> */}
            
            <link type="css" href={style}/>
            <div id="fb-share-button">
			    <FontAwesomeIcon icon={faFacebookF}/>
			    <a className="fb-share-button" href={facebookUrl} target="_blank"> Share </a>
		    </div>
        </React.Fragment>
     );
}
 
export default ShareOnFb;