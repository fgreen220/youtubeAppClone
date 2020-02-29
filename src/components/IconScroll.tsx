import React, { useState } from 'react';
import windowResizer from '../helpers/windowResize';


const IconScroll = (props:any) => {
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  windowResizer(setWindowWidth);
  console.log(props.page === 'trending');
  return(
    props.page === 'trending' && windowWidth < 550 ?
    <div id='icon-scroll-small'>
      {[...new Array(5)].map((item, index) => <div key={`trending-small-${index}`}></div>)}
    </div>
    :
    props.page === 'subscriptions' && windowWidth < 550?
    <div id='icon-scroll-small'>
      {[...new Array(30)].map((item, index) => <div key={`subscriptions-small-${index}`}></div>)}
    </div>
    :
    props.page === 'subscriptions' && windowWidth >= 550?
    <div id='icon-scroll-large'>
      {[...new Array(30)].map((item, index) => <div key={`subscriptions-large-${index}`}></div>)}
    </div>
    :
    <div id='icon-scroll-large'>
      {[...new Array(5)].map((item, index) => <div key={`trending-large-${index}`}></div>)}
    </div>
  );
}

export default IconScroll;