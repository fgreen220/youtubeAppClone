import React, { Fragment, useState } from 'react';
import windowResizer from '../helpers/windowResize';

const VideoScroll = (props:any) => {

  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  windowResizer(setWindowWidth);
  console.log(props);
  return(
    <Fragment>
      {props.page === 'library' ? <p>Recent</p>:null}
      <div className='videoScroll' style={{...props.style}}>
        {[...new Array(50)].map((item, index) => {
          let i = 0;
          return (
            // windowWidth > 2200 ?
            // :windowWidth > 1650 ?
            // :windowWidth > 1100 ?
            props.page !== 'library'
            &&
            windowWidth >= 550 ?
            <div style={{gridRow:index+1}} className='containerDiv' key={index}>
              <div style={{gridRow:index+1, gridColumn:'1/2'}} className='videoContainer'></div>
              <div style={{gridRow: index+1, gridColumn:'1/2'}} className='infoContainer'></div>
              <div style={{gridRow: index+1, gridColumn:'2'}} className='videoContainer1'></div>
              <div style={{gridRow: index+1, gridColumn:'2'}} className='infoContainer1'></div>
            </div>
            :
            props.page === 'library'
            && index<=15 ?
            <div style={{gridRow:index+1}}
            className={`${index===0?'recentDivStart':index===15?'recentDivEnd':'recentDiv'}`}
            key={index}>
              <div style={{gridRow:1, gridColumn:index+1}} className='recentVideo'></div>
              <div style={{gridRow:2, gridColumn:index+1}} className='recentInfo'></div>
            </div>
            :
            props.page !== 'library'
            && windowWidth < 550 ?
            <div key={index}>
              <div className='videoContainer'></div>
              <div className='infoContainer'></div>
              <hr />
            </div>
            :
            null
          )
        })}
      </div>
      {props.page==='library' ? <hr id='libHorizontalRule'/> : null}
    </Fragment>
  );
};

export default VideoScroll;