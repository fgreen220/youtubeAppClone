import React, { useState } from 'react';
import windowResizer from '../helpers/windowResize';


const IconScroll = (props:any) => {
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  windowResizer(setWindowWidth);
  console.log(props.page === 'trending');
  return(
    props.page === 'trending' && windowWidth < 550 ?
    <div id='icon-scroll-small'>
      {[...new Array(5)].map(index => <div key={index}></div>)}
    </div>
    :
    props.page === 'subscriptions' && windowWidth < 550?
    <div id='icon-scroll-small'>
      {[...new Array(30)].map(index => <div key={index}></div>)}
    </div>
    :
    props.page === 'subscriptions' && windowWidth >= 550?
    <div id='icon-scroll-large'>
      {[...new Array(30)].map(index => <div key={index}></div>)}
    </div>
    :
    <div id='icon-scroll-large'>
      {[...new Array(5)].map(index => <div key={index}></div>)}
    </div>
  );
}

export default IconScroll;