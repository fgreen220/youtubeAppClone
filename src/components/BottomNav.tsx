import React, { useState, useEffect, Fragment } from 'react';
import { 
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  Divider,
  IconButton,
  Popper,
  Paper,
  Avatar,
  TextField,
  Grid
 } from '@material-ui/core';
import {
  Home,
  Whatshot,
  Subscriptions,
  Mail,
  VideoLibrary,
  ExpandMore,
  ThumbUp,
  ThumbDown,
  Share,
  GetApp,
  LibraryAdd,
  Tune,
  AccountCircle,
  Comment,
  MoreVert
} from '@material-ui/icons';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import selectedButtonHandler from '../helpers/selectedButtonHandler';
import Trending from './Trending';
import Inbox from './Inbox';
import SubscriptionsView from './Subscriptions';
import Library from './Library';
import HomeView from './Home';
import useVideoSearch from '../hooks/useVideoSearch';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import windowResizer from '../helpers/windowResize';


let categoryListObject:any = {
  '1':'Film & Animation',//
  '2':'Autos & Vehicles',//
  '10':'Music',//
  '15':'Pets & Animals',//
  '17':'Sports',//
  '20':'Gaming',//
  '23':'Comedy',//
  '24':'Entertainment',//
  '26':'Howto & Style',//
  '28':'Science & Technology'
}

interface ResponseObject {
  kind: string;
  etag: string;
  nextPageToken:string;
  pageInfo: {};
  items: {kind:string, etag:string, id:string, snippet:{thumbnails:{maxres:{url:string}}}, contentDetails:{},player:{embedHtml:string}}[];
}

const useStyles = makeStyles({
  root: {
    width: '100vw',
    backgroundColor: '#212121',
    position:'fixed',
    bottom:0
  }
});


const buttonStyles = makeStyles({
  root: {
    display:'grid',
    maxWidth:'none',
    color: '#9e9e9e',
  },
  selected: {
    color: "#FFFFFF"
  },
  label: {
    color: '#9e9e9e'
  }
}, { name: 'MuiBottomNavigationAction' });

export default function BottomNav(props: any) {
  const classes = useStyles();
  const btnClasses = buttonStyles();
  const [value, setValue] = useState(0);
  const [selectedButton, setSelectedButton] = useState(location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageTokens, setPageTokens] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [videoData, setVideoData]  = useState([]);
  const [trendingPageTokens, setTrendingPageTokens] = useState({});
  const [trendingNextPage, setTrendingNextPage] = useState({});
  const [trendingVideoData, setTrendingVideoData]  = useState({});
  const [trendingCategoryPage, setTrendingCategoryPage] = useState('1');
  const [urlTrendingObject, setUrlTrendingObject] = useState({});
  const [urlObject, setUrlObject] = useState<string[]>([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState([]);
  const [videoStatistics, setVideoStatistics] = useState<{[string:string]:{
    viewCount:string,
    likeCount:string,
    dislikeCount:string,
    favoriteCount:string,
    commentCount:string
  }}>();
  const [videoDescription, setVideoDescription] = useState<string[]>([]);
  const [videoId, setVideoId] = useState<string[]>([]);
  // const loading = false;
  // const error = false;
  // const hasMore = false;
  const {
    loading,
    error,
    hasMore
  } = useVideoSearch(
    selectedButton==='/trending'?trendingNextPage:nextPage,
    selectedButton==='/trending'?setTrendingPageTokens:setPageTokens,
    selectedButton==='/trending'?trendingPageTokens:pageTokens,
    selectedButton==='/trending'?setTrendingVideoData:setVideoData,
    selectedButton,
    trendingCategoryPage,
    selectedButton==='/trending'?setUrlTrendingObject:setUrlObject,
    setVideoTitle,
    setVideoStatistics,
    setVideoDescription,
    setVideoId);

  selectedButtonHandler('#bottomNav a', 'Mui-selected');

  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  windowResizer(setWindowWidth);

  const [commentData, setCommentData] = useState<{}[]>([]);

  useEffect(() => {
    console.log(videoId[urlObject.indexOf(currentVideoUrl)]);
    currentVideoUrl.length >= 1 &&
    videoId[urlObject.indexOf(currentVideoUrl)]?
    fetch('http://localhost:3000/comments', {
      method:'get',
      headers: {
        'Content-Type': 'application/json',
        'videoid': `${videoId[urlObject.indexOf(currentVideoUrl)]}`
      }
    })
    .then(response => response.json())
    .then(data => {
      data = JSON.parse(data);
      console.log(data);
      setCommentData((prevComments:[{}]) => [...prevComments, ...data.items.map((comment:{[string:string]:{}}) => {
        return comment.snippet;
      })])
    })
    :null
  }, [currentVideoUrl])

  const passEmbedUrl = async (urlString:string) => {
    await setCurrentVideoUrl(() => urlString);
  }

  useEffect(() => {
    const modalVideoLink = document.querySelectorAll('.modal-link');
    const modalClose = document.querySelector('.modal-close');
    const modalBg = document.querySelector('.modal-bg');
    const hideEllipsis = document.querySelectorAll('.video-tiles .video-tiles-3 .video-tile-info-container .ellipsis-menu-placeholder');
    const hideAccountCircle = document.querySelectorAll('.video-tile-account-circle');
    const topAppBar = document.querySelector('.top-app-bar');
    const bottomNavBar = document.querySelector('.bottom-nav-bar');
    const hideIconSmall = document.querySelectorAll('icon-small-toggle');
    const hideIconLarge = document.querySelectorAll('.icon-large-toggle');
    const bgActive = document.querySelector('.bg-active');

    const addBg = () => {
      modalBg?.classList.add('bg-active');
      modalBg?disableBodyScroll(modalBg):null;
      topAppBar?.classList.add('hidden-app-bar');
      bottomNavBar?.classList.add('hidden-nav-bar');
      Array(hideIconSmall)[0].forEach(icon => {
        icon.classList.replace('icon-small', 'hidden-icon-small');
      }
      )
      Array(hideIconLarge)[0].forEach(icon => {
        icon.classList.replace('icon-large', 'hidden-icon-large');
      }
      )
      Array(hideEllipsis)[0].forEach(node => {
        node.classList.replace('ellipsis-menu', 'hidden-ellipsis');
      }
      )
      Array(hideAccountCircle)[0].forEach(node => {
        node.classList.add('hidden-account-circle');
      }
      )
    }

    Array(modalVideoLink)[0].forEach(video => {
      video.addEventListener('click', addBg);
    })
    return(() => {
      Array(modalVideoLink)[0].forEach(video => {
        video.removeEventListener('click', addBg);
      })
    })


  })

  useEffect(() => {
    const modalClose = document.querySelector('.modal-close');
    const modalBg = document.querySelector('.modal-bg');
    const hideEllipsis = document.querySelectorAll('.video-tiles .video-tiles-3 .video-tile-info-container .ellipsis-menu-placeholder');
    const hideAccountCircle = document.querySelectorAll('.video-tile-account-circle');
    const topAppBar = document.querySelector('.top-app-bar');
    const bottomNavBar = document.querySelector('.bottom-nav-bar');
    const hideIconSmall = document.querySelectorAll('icon-small-toggle');
    const hideIconLarge = document.querySelectorAll('.icon-large-toggle');
    const bgActive = document.querySelector('.bg-active');

  
    const removeBg = () => {
      modalBg?.classList.remove('bg-active')
      modalBg?enableBodyScroll(modalBg):null;
      topAppBar?.classList.remove('hidden-app-bar');
      bottomNavBar?.classList.remove('hidden-nav-bar');
      Array(hideIconSmall)[0].forEach(icon => {
        icon.classList.replace('hidden-icon-small','icon-small');
      }
      )
      Array(hideIconLarge)[0].forEach(icon => {
        icon.classList.replace('hidden-icon-large','icon-large');
      }
      )
      Array(hideEllipsis)[0].forEach(node => {
        node.classList.replace('hidden-ellipsis','ellipsis-menu');
      }
      )
      Array(hideAccountCircle)[0].forEach(node => {
        node.classList.remove('hidden-account-circle');
      }
      )
    }

    modalClose?.addEventListener('click', removeBg)

    return(() => {
      modalClose?.removeEventListener('click', removeBg);
      modalBg? modalBg.scrollTop = 0:null;
      console.log('scrolled to top');
    })
  }, [currentVideoUrl])

  useEffect(() => {
    currentVideoUrl.length >= 1 &&
    videoId[urlObject.indexOf(currentVideoUrl)]?
    fetch('http://localhost:3000/comments', {
      method:'get',
      headers: {
        'Content-Type': 'application/json',
        'videoid': `${videoId[urlObject.indexOf(currentVideoUrl)]}`
      }
    })
    .then(response => response.json())
    .then(data => {
      data = JSON.parse(data);
      console.log(data);
      setCommentData((prevComments:[{}]) => [...prevComments, ...data.items.map((comment:{[string:string]:{}}) => {
        return comment.snippet;
      })])
    })
    :null
  }, [currentVideoUrl])

  const [popperAnchorEl, setPopperAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event:React.MouseEvent<HTMLElement>) => {
    setPopperAnchorEl(popperAnchorEl ? null : event.currentTarget);
  }

  const popperOpen = Boolean(popperAnchorEl);
  const popperId = popperOpen ? 'simple-popper' : undefined;

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <div className='modal-bg' >
            <div className='modal'>
              <div className={'modal-video-wrapper modal-wrapper'}>
                <iframe width="480px" height="270px" src={currentVideoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMore id="accordion-expansion-icon"/>}
                  >
                  <p>{videoTitle[urlObject.indexOf(currentVideoUrl)]}</p>
                  <p>{videoStatistics?videoStatistics[`${urlObject.indexOf(currentVideoUrl)}`]?.viewCount:null}</p>
                  <div>
                  <Button
                      variant='contained'
                      startIcon={<ThumbUp />}
                  >
                    <p>{videoStatistics?videoStatistics[`${urlObject.indexOf(currentVideoUrl)}`]?.likeCount:null}</p>
                  </Button>
                  <Button
                    variant='contained'
                    startIcon={<ThumbDown />}
                  >
                    <p>{videoStatistics?videoStatistics[`${urlObject.indexOf(currentVideoUrl)}`]?.dislikeCount:null}</p>
                  </Button>
                  <Button
                    variant='contained'
                    startIcon={<Share />}
                  >
                    <p>Share</p>
                  </Button>
                  <Button
                    variant='contained'
                    startIcon={<GetApp />}
                  >
                    <p>Download</p>
                  </Button>
                  <Button
                    variant='contained'
                    startIcon={<LibraryAdd />}
                  >
                    <p>Save</p>
                  </Button>                                                                            
                  </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <p>
                      {videoDescription?videoDescription[urlObject.indexOf(currentVideoUrl)]:null}
                    </p>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <Divider />
                <div id='comment-controls'>
                  <h1>Comments <span>{videoStatistics?videoStatistics[`${urlObject.indexOf(currentVideoUrl)}`]?.commentCount:null}</span></h1>
                  <IconButton onClick={handleClick}>
                    <Tune />
                  </IconButton>
                  <Popper id={popperId} open={popperOpen} anchorEl={popperAnchorEl} placement='top-end' modifiers={{
                    flip: {
                      enabled: false,
                    },
                    preventOverflow: {
                      enabled: false,
                      boundariesElement: 'scrollParent',
                    }
                  }}>
                    <Paper elevation={3}>
                      <Button><p>Top Comments</p></Button>
                      <Button><p>Most Relevant</p></Button>
                    </Paper>
                  </Popper>
                </div>
                <div id='comment-add'>
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                  <TextField placeholder="Add a public comment" />
                </div>
                <div id='comment-data'>
                  {commentData?.map((comment:{[string:string]:any}, index) => {
                    return (
                      <Fragment key={`${comment.topLevelComment.id}`}>
                        {index === 0?<Divider />:null}
                        <div id='comment-main'>  
                          <Avatar>
                            <AccountCircle />
                          </Avatar>
                          <div id='comment-info'> 
                            <p>{`${comment.topLevelComment.snippet.authorDisplayName} • `}
                            {comment.topLevelComment.snippet.publishedAt.localeCompare(
                              comment.topLevelComment.snippet.updatedAt
                            ) === 0?comment.topLevelComment.snippet.publishedAt:
                            `${comment.topLevelComment.snippet.updatedAt} (edited)`}</p>                   
                            <p>{comment.topLevelComment.snippet.textOriginal}</p>
                            <div id='comment-actions'>
                              <IconButton>
                                  <ThumbUp />
                              </IconButton>
                              <span className='comment-data-count'>{comment.topLevelComment.snippet.likeCount}</span>
                              <IconButton>
                                <ThumbUp />
                              </IconButton>
                              <IconButton>
                                <Comment />
                              </IconButton>
                              <span className='comment-data-count'>{comment.totalReplyCount!==0?comment.totalReplyCount:null}</span>
                              <IconButton id='comment-report'>
                                <MoreVert />
                              </IconButton>
                            </div>
                            <div id='view-replies'>
                                {comment.totalReplyCount!==0?<Button>{`VIEW ${comment.totalReplyCount} REPLIES`}</Button>:null}
                            </div>
                          </div>
                        </div>
                        <Divider />
                        </Fragment>
                    );
                  }
                  )}
                </div>
              </div>
              <span className='modal-close'>X</span>
            </div>
          </div>
            <HomeView 
              videoData={videoData}
              loading={loading}
              error={error}
              setNextPage={setNextPage}
              pageTokens={pageTokens}
              hasMore={hasMore}
              urlObject={urlObject}
              passEmbedUrl={passEmbedUrl}
              videoTitle={videoTitle}
              videoStatistics={videoStatistics}
          />
        </Route>
        <Route path='/trending'>
          <div className='modal-bg' >
            <div className='modal'>
              <div className={'modal-video-wrapper modal-wrapper'}>
                <iframe width="480px" height="270px" src={currentVideoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <span className='modal-close'>X</span>
            </div>
          </div>
          <Trending 
            trendingVideoData={trendingVideoData}
            loading={loading}
            error={error}
            setTrendingNextPage={setTrendingNextPage}
            trendingPageTokens={trendingPageTokens}
            hasMore={hasMore}
            categoryListObject={categoryListObject}
            setTrendingCategoryPage={setTrendingCategoryPage}
            trendingCategoryPage={trendingCategoryPage}
            trendingNextPage={trendingNextPage}
            urlTrendingObject={urlTrendingObject}
            passEmbedUrl={passEmbedUrl}
          />
        </Route>
        <Route path='/subscriptions'>
            <SubscriptionsView isLoggedIn={isLoggedIn}/>
        </Route>
        <Route path='/inbox'>
            <Inbox isLoggedIn={isLoggedIn}/>
        </Route>
        <Route path='/library'>
          <Library isLoggedIn={isLoggedIn}/>
        </Route>
      </Switch>

      <BottomNavigation
        id='bottomNav'
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          setValue(newValue);
        }}
        showLabels
        className={`${classes.root} bottom-nav-bar`}
        onClick={() => setSelectedButton(location.pathname)}
      >
        <BottomNavigationAction component={Link} to='/' classes={{root: btnClasses.root, selected: btnClasses.selected, label: btnClasses.label}} label='Home' icon={<Home />} />
        <BottomNavigationAction component={Link} to='/trending' classes={{root: btnClasses.root, selected: btnClasses.selected, label: btnClasses.label}} label='Trending' icon={<Whatshot />} />
        <BottomNavigationAction component={Link} to='/subscriptions' classes={{root: btnClasses.root, selected: btnClasses.selected, label: btnClasses.label}} label='Subscriptions' icon={<Subscriptions />} />
        <BottomNavigationAction component={Link} to='/inbox' classes={{root: btnClasses.root, selected: btnClasses.selected, label: btnClasses.label}} label='Inbox' icon={<Mail />} />
        <BottomNavigationAction component={Link} to='/library' classes={{root: btnClasses.root, selected: btnClasses.selected, label: btnClasses.label}} label='Library' icon={<VideoLibrary />} />
      </BottomNavigation>
    </Router>
  );
}
