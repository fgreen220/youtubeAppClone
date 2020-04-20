import React, { Fragment, useState, useRef, useCallback, useEffect } from 'react';
import IconScroll from './IconScroll';
import VideoScroll from './VideoScroll';
import windowResizer from '../helpers/windowResize';
import { AccountCircle, MoreVert } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const Trending = (props:any) => {
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  windowResizer(setWindowWidth);
  const observer:React.MutableRefObject<any> = useRef();

  const trendingCategoryHandler = async (e:any) => {
    e.persist();
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
        const returnedValue = await trendingNextPageHandler();
        return returnedValue;
      }
    })
    if(node) observer.current.observe(node)
  }, [props.trendingCategoryPage, props.loading, props.hasMore[props.trendingCategoryPage]]);
  useEffect(() => {
    if(props.setDisplayedArray(props.trendingVideoData)){
      props.setDisplayedArray((props.trendingVideoData[props.trendingCategoryPage]));
    }
  },[props.trendingVideoData, props.trendingCategoryPage])

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

  const [accountCircleTooltipOpen, setAccountCircleTooltipOpen] = useState<boolean>(false);
  const [accountCircleId, setAccountCircleId] = useState<number>(-1);
  const [ellipsisTooltipOpen, setEllipsisTooltipOpen] = useState<boolean>(false);
  const [ellipsisId, setEllipsisId] = useState<number>(-1);

  return(
    <Fragment>
      <IconScroll categoryListObject={props.categoryListObject} trendingCategoryHandler={trendingCategoryHandler} page='trending' loading={props.loading}/>
      <div className='video-tiles' style={{gridTemplateColumns:windowWidth<=1100 && windowWidth>550?'1fr 1fr':'1fr 1fr 1fr'}}>
      {props.displayedArray[props.trendingCategoryPage]?.map((item:any, index:number) => {
        return (
          props.displayedArray[props.trendingCategoryPage]?.length !== index+1 ?
              <div className={`${sizeClass} modal-link`}
              key={`withoutLastElementRef-${index}`}
              onClick={() => {
                props.passEmbedUrl(props.urlTrendingObject[props.trendingCategoryPage][index], item);
                props.setTrendingLinkIndex(() => index);
                props.setIsTrending(() => true);
                }}>
                {/* ['snippet']['thumbnails']['maxres']['url'] */}
                <img className='videoThumbnail' src={`${item}`} />
                <div className='video-tile-info-container'>
                <Tooltip title='Feature not supported' open={accountCircleId === index ? accountCircleTooltipOpen : false}
                  onOpen={() => null}
                  onClose={() => {
                    setAccountCircleTooltipOpen(() => false);
                  }
                }>
                  <IconButton onClick={() => {
                    setAccountCircleId(() => index);
                    setAccountCircleTooltipOpen(() => true);
                    }
                  }>
                    <AccountCircle className='video-tile-account-circle'/>
                  </IconButton>
                </Tooltip>
                  <div className='info-text-wrapper'>
                    <p id='video-info'>{props.trendingVideoCollection[props.trendingCategoryPage][index]['snippet']['title']}</p>
                  </div>
                  <Tooltip title='Feature not supported' open={ellipsisId === index ? ellipsisTooltipOpen : false}
                    onOpen={() => null}
                    onClose={() => {
                      setEllipsisTooltipOpen(() => false);
                    }
                  }>
                    <IconButton onClick={() => {
                      setEllipsisId(() => index);
                      setEllipsisTooltipOpen(() => true);
                      }
                    }>
                        <MoreVert className='ellipsis-menu'/>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
          :
            <div className={`${sizeClass} modal-link`}
            key={`withLastElementRef-${index}`} ref={lastVideoElementRef}
            onClick={() => {
              props.passEmbedUrl(props.urlTrendingObject[props.trendingCategoryPage][index], item);
              props.setTrendingLinkIndex(() => index);
              props.setIsTrending(() => true);
            }}>
              {/* ['snippet']['thumbnails']['maxres']['url'] */}
              <img className='videoThumbnail' src={`${item}`} />
              <div className='video-tile-info-container'>
              <Tooltip title='Feature not supported' open={accountCircleId === index ? accountCircleTooltipOpen : false}
                onOpen={() => null}
                onClose={() => {
                  setAccountCircleTooltipOpen(() => false);
              }}
              >
                <IconButton onClick={() => {
                  setAccountCircleId(() => index);
                  setAccountCircleTooltipOpen(() => true);
                  }}>
                  <AccountCircle className='video-tile-account-circle'/>
                </IconButton>
              </Tooltip>
                <div className='info-text-wrapper'>
                  <p id='video-info'>{props.trendingVideoCollection[props.trendingCategoryPage][index]['snippet']['title']}</p>
                </div>
                <Tooltip title='Feature not supported' open={ellipsisId === index ? ellipsisTooltipOpen : false}
                  onOpen={() => null}
                  onClose={() => {
                    setEllipsisTooltipOpen(() => false);
                }}
                >
                  <IconButton onClick={() => {
                  setEllipsisId(() => index);
                  setEllipsisTooltipOpen(() => true);
                  }}>
                    <MoreVert className='ellipsis-menu'/>
                  </IconButton>
                </Tooltip>
              </div>
            </div>
        )
      })}
      {
        props.loading ?
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
    </Fragment>
  );
}

export default Trending;