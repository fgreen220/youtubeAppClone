import React, { Fragment, useState, useRef } from 'react';
import windowResizer from '../helpers/windowResize';
import { IconButton, Tooltip } from '@material-ui/core';
import {
  MoreVert
} from '@material-ui/icons';

const VideoScroll = (props:any) => {

  const [windowWidth, setWindowWidth] = useState<number>(window.outerWidth);
  windowResizer(setWindowWidth);
  const [contextTooltipOpen, setContextTooltipOpen] = useState<boolean>(false);
  const [indexToOpen, setIndexToOpen] = useState<number>(16);

  return(
    <Fragment>
      {props.page === 'library' ? <p id='recentHeading'>Recent</p>:null}
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
            <div
            className={`${index===0?'recentDivStart':index===15?'recentDivEnd':'recentDiv'}`}
            key={index}>
              <img src='../assets/no_thumbnail.jpg' style={{gridRow:1, gridColumn:index+1}} />
              <div className='recentVidInfoContainer'>
                <p>VIDEO INFO</p>
                <Tooltip title='Feature not supported' open={index === indexToOpen? contextTooltipOpen:false} 
                  disableFocusListener={true}
                  onOpen={(event:any) => {
                    setIndexToOpen(() => index)
                  }}
                  onClose={() => setContextTooltipOpen(() => false)}
                >
                  <IconButton className='recentVidActionButton' disableFocusRipple={true} disableRipple={true}
                    onClick={() => setContextTooltipOpen(() => true)}
                  >
                      <MoreVert viewBox='-10 0 24 24' />
                  </IconButton>
                </Tooltip>
              </div>
              <p>VIDEO INFO</p>
            </div>
            :
            props.page === 'library'
            && index===16?
            <div style={{width:'1.25rem'}}>
              &nbsp;
            </div>
            :
            props.page !== 'library'
            && windowWidth < 550 ?
            <div key={index}>
              <div className='videoContainer'></div>
              <div className='infoContainer'></div>
            </div>
            :
            null
          )
        })}
      </div>
    </Fragment>
  );
};

export default VideoScroll;