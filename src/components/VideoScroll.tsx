import * as React from 'react';

const VideoScroll = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.outerWidth);

  return(
    <React.Fragment>
      {[...new Array(50)].map((item, index) => {
        let i = 0;
        return (
          // windowWidth > 2200 ?
          // :windowWidth > 1650 ?
          // :windowWidth > 1100 ?
          windowWidth > 550 ?
          <div style={{gridRow:index+1}} className='containerDiv' key={index}>
            <div style={{gridRow:index+1, gridColumn:'1/2'}} className='videoContainer'></div>
            <div style={{gridRow: index+1, gridColumn:'1/2'}} className='infoContainer'></div>
            <div style={{gridRow: index+1, gridColumn:'2'}} className='videoContainer1'></div>
            <div style={{gridRow: index+1, gridColumn:'2'}} className='infoContainer1'></div>
            <hr />
          </div>
          :
          <div key={index}>
            <div className='videoContainer'></div>
            <div className='infoContainer'></div>
            <hr />
          </div>
        )
      })}
    </React.Fragment>
  );
};

export default VideoScroll;