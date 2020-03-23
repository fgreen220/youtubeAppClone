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
import selectedButtonHandler from '../helpers/selectedButtonHandler'
import Trending from './Trending';
import Inbox from './Inbox';
import SubscriptionsView from './Subscriptions';
import Library from './Library';
import HomeView from './Home';
import useVideoSearch from '../hooks/useVideoSearch';
import windowResizer from '../helpers/windowResize'
import ModalOverlay from './ModalOverlay'


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
    backgroundColor: 'white',
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
  // const loading = true;
  // const error = false;
  // const hasMore = false;
  const {
    loading,
    error,
    hasMore
  } = useVideoSearch(
    selectedButton==='/trending'?props.trendingNextPage:nextPage,
    selectedButton==='/trending'?props.setTrendingPageTokens:setPageTokens,
    selectedButton==='/trending'?props.trendingPageTokens:pageTokens,
    selectedButton==='/trending'?props.setTrendingVideoData:props.setVideoData,
    selectedButton,
    props.trendingCategoryPage,
    selectedButton==='/trending'?props.setUrlTrendingObject:props.setUrlObject,
    props.setVideoTitle,
    props.setVideoStatistics,
    props.setVideoDescription,
    props.setVideoId,
    props.setTrendingVideoCollection);

  selectedButtonHandler('#bottomNav a', 'Mui-selected');

  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  windowResizer(setWindowWidth);

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <ModalOverlay 
            currentVideoUrl={props.currentVideoUrl}
            videoTitle={props.videoTitle}
            urlObject={props.urlObject}
            videoStatistics={props.videoStatistics}
            videoDescription={props.videoDescription}
            handleClick={props.handleClick}
            popperId={props.popperId}
            popperOpen={props.popperOpen}
            popperAnchorEl={props.popperAnchorEl}
            commentData={props.commentData}
            isSearchResult={props.isSearchResult}
            setIsSearchResult={props.setIsSearchResult}
            setSearchResultsArray={props.setSearchResultsArray}
            searchResultsArray={props.searchResultsArray}
            searchResultIndex={props.searchResultIndex}
            setSearchResultIndex={props.setSearchResultIndex}
            currentVideoImage={props.currentVideoImage}
            setIsIframeLoaded={props.setIsIframeLoaded}
            isIframeLoaded={props.isIframeLoaded}
          />
            <HomeView 
              videoData={props.videoData}
              loading={loading}
              error={error}
              setNextPage={setNextPage}
              pageTokens={pageTokens}
              hasMore={hasMore}
              urlObject={props.urlObject}
              passEmbedUrl={props.passEmbedUrl}
              videoTitle={props.videoTitle}
              videoStatistics={props.videoStatistics}
              isSearchResult={props.isSearchResult}
              setIsSearchResult={props.setIsSearchResult}
          />
        </Route>
        <Route path='/trending'>
          <ModalOverlay 
            currentVideoUrl={props.currentVideoUrl}
            videoTitle={props.videoTitle}
            urlObject={props.urlObject}
            videoStatistics={props.videoStatistics}
            videoDescription={props.videoDescription}
            handleClick={props.handleClick}
            popperId={props.popperId}
            popperOpen={props.popperOpen}
            popperAnchorEl={props.popperAnchorEl}
            commentData={props.commentData}
            isSearchResult={props.isSearchResult}
            setIsSearchResult={props.setIsSearchResult}
            setSearchResultsArray={props.setSearchResultsArray}
            searchResultsArray={props.searchResultsArray}
            searchResultIndex={props.searchResultIndex}
            setSearchResultIndex={props.setSearchResultIndex}
            currentVideoImage={props.currentVideoImage}
            setIsIframeLoaded={props.setIsIframeLoaded}
            isIframeLoaded={props.isIframeLoaded}
            trendingVideoCollection={props.trendingVideoCollection}
            isTrending={props.isTrending}
            trendingLinkIndex={props.trendingLinkIndex}
            trendingCategoryPage={props.trendingCategoryPage}
            setIsTrending={props.setIsTrending}
          />
          <Trending 
            trendingVideoData={props.trendingVideoData}
            loading={loading}
            error={error}
            setTrendingNextPage={props.setTrendingNextPage}
            trendingPageTokens={props.trendingPageTokens}
            hasMore={hasMore}
            categoryListObject={categoryListObject}
            setTrendingCategoryPage={props.setTrendingCategoryPage}
            trendingCategoryPage={props.trendingCategoryPage}
            trendingNextPage={props.trendingNextPage}
            urlTrendingObject={props.urlTrendingObject}
            passEmbedUrl={props.passEmbedUrl}
            isSearchResult={props.isSearchResult}
            setIsSearchResult={props.setIsSearchResult}
            trendingVideoCollection={props.trendingVideoCollection}
            displayedArray={props.displayedArray}
            setDisplayedArray={props.setDisplayedArray}
            setIsTrending={props.setIsTrending}
            setTrendingLinkIndex={props.setTrendingLinkIndex}
          />
        </Route>
        <Route path='/subscriptions'>
          <ModalOverlay 
            currentVideoUrl={props.currentVideoUrl}
            videoTitle={props.videoTitle}
            urlObject={props.urlObject}
            videoStatistics={props.videoStatistics}
            videoDescription={props.videoDescription}
            handleClick={props.handleClick}
            popperId={props.popperId}
            popperOpen={props.popperOpen}
            popperAnchorEl={props.popperAnchorEl}
            commentData={props.commentData}
            isSearchResult={props.isSearchResult}
            setIsSearchResult={props.setIsSearchResult}
            setSearchResultsArray={props.setSearchResultsArray}
            searchResultsArray={props.searchResultsArray}
            searchResultIndex={props.searchResultIndex}
            setSearchResultIndex={props.setSearchResultIndex}
            currentVideoImage={props.currentVideoImage}
            setIsIframeLoaded={props.setIsIframeLoaded}
            isIframeLoaded={props.isIframeLoaded}
          />
          <SubscriptionsView isLoggedIn={isLoggedIn}/>
        </Route>
        <Route path='/inbox'>
          <ModalOverlay 
            currentVideoUrl={props.currentVideoUrl}
            videoTitle={props.videoTitle}
            urlObject={props.urlObject}
            videoStatistics={props.videoStatistics}
            videoDescription={props.videoDescription}
            handleClick={props.handleClick}
            popperId={props.popperId}
            popperOpen={props.popperOpen}
            popperAnchorEl={props.popperAnchorEl}
            commentData={props.commentData}
            isSearchResult={props.isSearchResult}
            setIsSearchResult={props.setIsSearchResult}
            setSearchResultsArray={props.setSearchResultsArray}
            searchResultsArray={props.searchResultsArray}
            searchResultIndex={props.searchResultIndex}
            setSearchResultIndex={props.setSearchResultIndex}
            currentVideoImage={props.currentVideoImage}
            setIsIframeLoaded={props.setIsIframeLoaded}
            isIframeLoaded={props.isIframeLoaded}
          />
          <Inbox isLoggedIn={isLoggedIn}/>
        </Route>
        <Route path='/library'>
          <ModalOverlay 
            currentVideoUrl={props.currentVideoUrl}
            videoTitle={props.videoTitle}
            urlObject={props.urlObject}
            videoStatistics={props.videoStatistics}
            videoDescription={props.videoDescription}
            handleClick={props.handleClick}
            popperId={props.popperId}
            popperOpen={props.popperOpen}
            popperAnchorEl={props.popperAnchorEl}
            commentData={props.commentData}
            isSearchResult={props.isSearchResult}
            setIsSearchResult={props.setIsSearchResult}
            setSearchResultsArray={props.setSearchResultsArray}
            searchResultsArray={props.searchResultsArray}
            searchResultIndex={props.searchResultIndex}
            setSearchResultIndex={props.setSearchResultIndex}
            currentVideoImage={props.currentVideoImage}
            setIsIframeLoaded={props.setIsIframeLoaded}
            isIframeLoaded={props.isIframeLoaded}
          />
          <Library isLoggedIn={isLoggedIn}/>
        </Route>
      </Switch>

      <BottomNavigation
        id='bottomNav'
        value={value}
        onChange={(event, newValue) => {
          props.setNavigationPage(() => newValue);
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
