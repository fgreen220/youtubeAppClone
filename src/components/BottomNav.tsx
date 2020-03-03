import React, { useState, useEffect, Fragment as div } from 'react';
import { 
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
 } from '@material-ui/core';
import {
  Home,
  Whatshot,
  Subscriptions,
  Mail,
  VideoLibrary,
  History,
  Slideshow,
  LocalOffer,
  WatchLater,
  ThumbUp,
  Add,
  AccountCircle,
  MoreVert
} from '@material-ui/icons';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import VideoScroll from './VideoScroll';
import IconScroll from './IconScroll';
import selectedButtonHandler from '../helpers/selectedButtonHandler';
import windowResizer from '../helpers/windowResize';


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


interface ResponseObject {
  kind: string;
  etag: string;
  nextPageToken:string;
  pageInfo: {};
  items: {kind:string, etag:string, id:string, snippet:{thumbnails:{maxres:{url:string}}}, contentDetails:{},player:{embedHtml:string}}[];
}

export default function BottomNav(props: any) {
  const classes = useStyles();
  const btnClasses = buttonStyles();
  const [value, setValue] = useState(0);
  const [selectedString, setSelectedString] = useState('Recently added');
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  windowResizer(setWindowWidth);
  const [videoData, setVideoData]  = useState<[ResponseObject]>([{
    kind: '',
    etag: '',
    nextPageToken:'',
    pageInfo: {},
    items: [{kind:'', etag:'', id:'', snippet:{thumbnails:{maxres:{url:''}}}, contentDetails:{}, player:{embedHtml:''}}]
  }]);

  selectedButtonHandler('#bottomNav a', 'Mui-selected');

  const handleChange = (event:React.ChangeEvent<{value: unknown}>) => {
    setSelectedString(event.target.value as string)
  }

  useEffect(() => {
    fetch(`http://localhost:3000/home-videos`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data:any) => {
      data = JSON.parse(data);
      console.log(data);
      setVideoData(():any => [data])
    })
  }, [])
  console.log(videoData);

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <div className='video-tiles' style={{gridTemplateColumns:windowWidth<=1100 && windowWidth>550?'1fr 1fr':'1fr 1fr 1fr'}}>
            {videoData[0]['items'].map((item, index) => {
              return (
                windowWidth <= 550 ?
              <div className='video-tiles-1' key={index}>
                <img src={`${item['snippet']['thumbnails']['maxres']['url']}`} />
                <div className='video-tile-info-container'>
                  <IconButton>
                    <AccountCircle id='video-tile-account-circle'/>
                  </IconButton>
                  <p id='video-info'>INFO CONTAINER</p>
                  <IconButton><MoreVert id='ellipsis-menu'/></IconButton>
                </div>
              </div>
              : windowWidth <= 1100 && windowWidth > 550 ?
              <div className='video-tiles-2' key={index}>
                <img src={`${item['snippet']['thumbnails']['maxres']['url']}`} />
                <div className='video-tile-info-container'>
                  <IconButton>
                    <AccountCircle id='video-tile-account-circle'/>
                  </IconButton>
                  <p id='video-info'>INFO CONTAINER</p>
                  <IconButton><MoreVert id='ellipsis-menu'/></IconButton>
                </div>
              </div>
              : 
              <div className='video-tiles-3' key={index}>
                <img src={`${item['snippet']['thumbnails']['maxres']['url']}`} />
                <div className='video-tile-info-container'>
                  <IconButton>
                    <AccountCircle id='video-tile-account-circle'/>
                  </IconButton>
                  <p id='video-info'>INFO CONTAINER</p>
                  <IconButton><MoreVert id='ellipsis-menu'/></IconButton>
                </div>
              </div>
              )
            })}
          </div>
          {/* <VideoScroll  page='home'/> */}
        </Route>
        <Route path='/trending'>
          <IconScroll page='trending'/>
          <VideoScroll page='trending'/>
        </Route>
        <Route path='/subscriptions'>
          <IconScroll page='subscriptions'/>
          <hr />
          <div id='buttonScroll'>
            <button>All</button>
            <button>Today</button>
            <button>Continue watching</button>
            <button>Unwatched</button>
            <button>Live</button>
            <button>Posts</button>
          </div>
          <hr />
          <VideoScroll />
        </Route>
        <Route path='/inbox'>,
          <div id='inbox-blurb'>
            <p>BELL ICON</p>
            <p>Your notifications live here</p>
            <p>Don't miss the latest videos and more from your favorite channels.</p>
            <button>TURN ON NOTIFICATIONS</button>
          </div>
        </Route>
        <Route path='/library'>
          <VideoScroll page='library' />
          <hr />
          <div id='library-middle'>
            <Button
              variant='contained'
              startIcon={<History />}
            >
              History
            </Button>
            <Button
              variant='contained'
              startIcon={<Slideshow />}
            >
              Your Videos
            </Button>
            <Button
              variant='contained'
              startIcon={<LocalOffer />}
            >
              Purchases
            </Button>
            <Button
              variant='contained'
              startIcon={<WatchLater />}
              id='watch-later-button'
            >
              <div>
              <p id='watch-later'>Watch Later</p>
              <p id='watched-videos'>0 watched videos</p>
              </div>
            </Button>
          </div>
          <hr />
          <div id='library-bottom'>
            <div id='playlist-filter'>
            <p style={{display:'inline', justifyContent:'space-between'}}>Playlists</p>
            <FormControl>
              <Select
              id='select-label'
              value={selectedString}
              onChange={handleChange}
              >
                <MenuItem value='A-Z'>A-Z</MenuItem>
                <MenuItem value='Recently added'>Recently Added</MenuItem>
              </Select>
            </FormControl>
            </div>
            <Button
              variant='contained'
              startIcon={<Add />}
            >
              New playlist
            </Button>
            <Button
              variant='contained'
              startIcon={<ThumbUp />}
            >
              Liked videos
            </Button>
            <VideoScroll style={{marginTop:'100px'}}/>
          </div>
        </Route>
      </Switch>

      <BottomNavigation
        id='bottomNav'
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
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
