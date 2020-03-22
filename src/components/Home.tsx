import React, { useState, useRef, useCallback, Fragment} from 'react';
import { IconButton } from '@material-ui/core';
import { AccountCircle, MoreVert } from '@material-ui/icons';
import windowResizer from '../helpers/windowResize';
import { Skeleton } from '@material-ui/lab';

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
    <div className='video-tiles' style={{gridTemplateColumns:windowWidth<=1100 && windowWidth>550?'1fr 1fr':'1fr 1fr 1fr'}}>
      {props.videoData.map((item:any, index:number) => {
        // let sizeClass:string;
        // switch(windowWidth) {
        //   case(windowWidth<=550?windowWidth:null):
        //     sizeClass='video-tiles-1';
        //     break;
        //   case(windowWidth<=1100 && windowWidth > 550?windowWidth:null):
        //     sizeClass = 'video-tiles-2';
        //     break;
        //   default:
        //     sizeClass='video-tiles-3'
        // }
        return (
          props.videoData.length !== index+1 ?
            <div className={`${sizeClass} modal-link`} key={index} onClick={() => props.passEmbedUrl(props.urlObject[index])}>
              {/* ['snippet']['thumbnails']['maxres']['url'] */}
              <img className='videoThumbnail' src={`${item}`} />
              <div className='video-tile-info-container'>
                <IconButton>
                  <AccountCircle className='video-tile-account-circle'/>
                </IconButton>
                <div className='info-text-wrapper'>
                  <p id='video-info'>{props.videoTitle[index]}</p>
                </div>
                <IconButton><MoreVert className='ellipsis-menu ellipsis-menu-placeholder'/></IconButton>
              </div>
            </div>
          :
            <div className={`${sizeClass} modal-link`} ref={lastVideoElementRef} key={index} onClick={() => props.passEmbedUrl(props.urlObject[index])}>
              {/* ['snippet']['thumbnails']['maxres']['url'] */}
              <img className='videoThumbnail' src={`${item}`} />
              <div className='video-tile-info-container'>
                <IconButton>
                  <AccountCircle className='video-tile-account-circle'/>
                </IconButton>
                <div className='info-text-wrapper'>
                  <p id='video-info'>{props.videoTitle[index]}</p>
                </div>
                <IconButton><MoreVert className='ellipsis-menu ellipsis-menu-placeholder'/></IconButton>
              </div>
            </div>
        )
      })}
      {props.loading ?
        [...new Array(12)].map((item:any, index:number) => {
          return (
            <div key={index} className={`${sizeClass} modal-link`}>
              <Skeleton variant='rect' className='videoThumbnail'/>
              <div className='video-tile-info-container'>
                <Skeleton style={{gridColumn:'1/span 3', height:'1.5rem'}} id='skeleton-info'/>
                <Skeleton style={{gridColumn:'1/span 3', height:'1.5rem'}} id='skeleton-info'/>
              </div>
            </div>
          );
        })
        :
        null
      }
      <div>{props.error && 'Error'}</div> 
    </div>
  );
}

export default HomeView;