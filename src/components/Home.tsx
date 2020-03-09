import React, { useState, useRef, useCallback } from 'react';
import { IconButton } from '@material-ui/core';
import { AccountCircle, MoreVert } from '@material-ui/icons';
import windowResizer from '../helpers/windowResize';

const HomeView = (props:any) => {
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  windowResizer(setWindowWidth);
  const observer:React.MutableRefObject<any> = useRef();
  const lastVideoElementRef = useCallback((node:any) => {
    if(props.loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(results => {
      if(results[0].isIntersecting && props.hasMore) {
        console.log('Visible');
        props.setNextPage(props.pageTokens[props.pageTokens.length-1]);
      }
    })
    if(node) observer.current.observe(node)
  }, [props.loading, props.hasMore]);
  console.log(props)
  return (
    <div className='video-tiles' style={{gridTemplateColumns:windowWidth<=1100 && windowWidth>550?'1fr 1fr':'1fr 1fr 1fr'}}>
      {props.videoData.map((item:any, index:number) => {
        let sizeClass:string;
        switch(windowWidth) {
          case(windowWidth<=550?windowWidth:null):
            sizeClass='video-tiles-1';
            break;
          case(windowWidth<=1100 && windowWidth > 550?windowWidth:null):
            sizeClass = 'video-tiles-2';
            break;
          default:
            sizeClass='video-tiles-3'
        }
        return (
          props.videoData.length !== index+1 ?
            <div className={`${sizeClass} modal-link`} key={index} onClick={() => props.passEmbedUrl(props.urlObject[index])}>
              {/* ['snippet']['thumbnails']['maxres']['url'] */}
              <img src={`${item}`} />
              <div className='video-tile-info-container'>
                <IconButton>
                  <AccountCircle className='video-tile-account-circle'/>
                </IconButton>
                <p id='video-info'>INFO CONTAINER</p>
                <IconButton><MoreVert className='ellipsis-menu'/></IconButton>
              </div>
            </div>
          :
            <div className={`${sizeClass} modal-link`} ref={lastVideoElementRef} key={index} onClick={() => props.passEmbedUrl(props.urlObject[index])}>
              {/* ['snippet']['thumbnails']['maxres']['url'] */}
              <img src={`${item}`} />
              <div className='video-tile-info-container'>
                <IconButton>
                  <AccountCircle className='video-tile-account-circle'/>
                </IconButton>
                <p id='video-info'>INFO CONTAINER</p>
                <IconButton><MoreVert className='ellipsis-menu'/></IconButton>
              </div>
            </div>
        )
      })}
      <div>{props.loading && 'Loading...'}</div>
      <div>{props.error && 'Error'}</div> 
    </div>
  );
}

export default HomeView;