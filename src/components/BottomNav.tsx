import React, { useState, useEffect, Fragment } from 'react';
import { 
  BottomNavigation,
  BottomNavigationAction,
  makeStyles
 } from '@material-ui/core';
import {
  Home,
  Whatshot,
  Subscriptions,
  Mail,
  VideoLibrary
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
  const [urlObject, setUrlObject] = useState([]);
  const [embedObject, setEmbedObject] = useState({});
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

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
    setEmbedObject);

  selectedButtonHandler('#bottomNav a', 'Mui-selected');

  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  windowResizer(setWindowWidth);

  useEffect(() => {
    const modalVideoLink = document.querySelectorAll('.modal-link');
    const modalBg = document.querySelector('.modal-bg');
    const modalClose = document.querySelector('.modal-close');
    const hideEllipsis = document.querySelectorAll('.video-tiles .video-tiles-3 .video-tile-info-container .ellipsis-menu');
    const hideAccountCircle = document.querySelectorAll('.video-tile-account-circle');
    const topAppBar = document.querySelector('.top-app-bar');
    const bottomNavBar = document.querySelector('.bottom-nav-bar');
    const hideIconSmall = document.querySelectorAll('icon-small-toggle');
    const hideIconLarge = document.querySelectorAll('.icon-large-toggle');

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
    Array(modalVideoLink)[0].forEach(video => {
      video.addEventListener('click', addBg);
    })
    modalClose?.addEventListener('click', removeBg)

    return(() => {
      Array(modalVideoLink)[0].forEach(video => {
        video.removeEventListener('click', addBg);
      })
      modalClose?.removeEventListener('click', removeBg);
      modalBg ? modalBg.scrollTop = 0:null;
    })
  })

  const passEmbedUrl = (urlString:string) => {
    setCurrentVideoUrl(() => urlString);
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <div className='modal-bg' >
            <div className='modal'>
              <div className={'modal-video-wrapper modal-wrapper'}>
                <iframe width="480px" height="270px" src={currentVideoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
              embedObject={embedObject}
              urlObject={urlObject}
              passEmbedUrl={passEmbedUrl}
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
