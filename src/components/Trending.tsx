import React, { Fragment, useState, useRef, useCallback, useEffect } from 'react';
import IconScroll from './IconScroll';
import VideoScroll from './VideoScroll';
import windowResizer from '../helpers/windowResize';
import { AccountCircle, MoreVert } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const Trending = (props:any) => {
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  windowResizer(setWindowWidth);
  const observer:React.MutableRefObject<any> = useRef();

  const trendingCategoryHandler = async (e:any) => {
    e.persist();
    console.log('22222222222222222222222',e.nativeEvent.path.filter((item:any) => item.tagName === 'BUTTON')[0].id);
    const setCategoryPage = await props.setTrendingCategoryPage(e.nativeEvent.path.filter((item:any) => item.tagName === 'BUTTON')[0].id);
    return setCategoryPage;
  }
  const trendingNextPageHandler = async () => {
    await props.setTrendingNextPage(() => {
      return (
        props.trendingNextPage[props.trendingCategoryPage]?
        {...props.trendingNextPage, [props.trendingCategoryPage]:[...props.trendingNextPage[props.trendingCategoryPage], props.trendingPageTokens[props.trendingCategoryPage][props.trendingPageTokens[props.trendingCategoryPage].length-1]]}
        :
        {...props.trendingNextPage, [props.trendingCategoryPage]:[props.trendingPageTokens[props.trendingCategoryPage][props.trendingPageTokens[props.trendingCategoryPage].length-1]]}
        )
    });
  }
  const lastVideoElementRef = useCallback((node:any) => {
    if(props.loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver( async (results) => {
      if(results[0].isIntersecting && props.hasMore[props.trendingCategoryPage]) {
        console.log('Visible');
        console.log('-------------',props.trendingCategoryPage)
        const returnedValue = await trendingNextPageHandler();
        return returnedValue;
      }
    })
    if(node) observer.current.observe(node)
  }, [props.trendingCategoryPage, props.loading, props.hasMore[props.trendingCategoryPage]]);
  const [displayedArray, setDisplayedArray]:any = useState([]);
  useEffect(() => {
    if(setDisplayedArray(props.trendingVideoData)){
      setDisplayedArray((props.trendingVideoData[props.trendingCategoryPage]));
    }
  },[props.trendingVideoData, props.trendingCategoryPage])

  return(
    <Fragment>
      <IconScroll categoryListObject={props.categoryListObject} trendingCategoryHandler={trendingCategoryHandler} page='trending' loading={props.loading}/>
      <div className='video-tiles' style={{gridTemplateColumns:windowWidth<=1100 && windowWidth>550?'1fr 1fr':'1fr 1fr 1fr'}}>
      {displayedArray[props.trendingCategoryPage]?.map((item:any, index:number) => {
        index === 0 ? console.log('DA: ',displayedArray,
          'VD: ',props.trendingVideoData[props.trendingCategoryPage],
          'UO: ',props.urlObject[props.trendingCategoryPage]):null;
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
          displayedArray[props.trendingCategoryPage]?.length !== index+1 ?
          <a className={sizeClass} key={`withoutLastElementRef-${index}`}
          href={props.urlObject[props.trendingCategoryPage]?`${props.urlObject[props.trendingCategoryPage][index]}`
                :`//youtube.com`}>
              <div key={index}>
                {/* ['snippet']['thumbnails']['maxres']['url'] */}
                <img src={`${item}`} />
                <div className='video-tile-info-container'>
                  <IconButton>
                    <AccountCircle id='video-tile-account-circle'/>
                  </IconButton>
                  <p id='video-info'>INFO CONTAINER</p>
                  <IconButton><MoreVert id='ellipsis-menu'/></IconButton>
                </div>
              </div>
            </a>
          :
          <a className={sizeClass} key={`withLastElementRef-${index}`} href={
            props.urlObject[props.trendingCategoryPage]?`${props.urlObject[props.trendingCategoryPage][index]}`
            : '//youtube.com'}>
            <div ref={lastVideoElementRef} key={index}>
              {/* ['snippet']['thumbnails']['maxres']['url'] */}
              <img src={`${item}`} />
              <div className='video-tile-info-container'>
                <IconButton>
                  <AccountCircle id='video-tile-account-circle'/>
                </IconButton>
                <p id='video-info'>INFO CONTAINER</p>
                <IconButton><MoreVert id='ellipsis-menu'/></IconButton>
              </div>
            </div>
          </a>
        )
      })}
      <div>{props.loading && 'Loading...'}</div>
      <div>{props.error && 'Error'}</div> 
    </div>
    </Fragment>
  );
}

export default Trending;