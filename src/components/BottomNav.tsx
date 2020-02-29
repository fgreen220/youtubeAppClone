import React, { useState, useEffect } from 'react';
import { 
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
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
  Add

} from '@material-ui/icons';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import VideoScroll from './VideoScroll';
import IconScroll from './IconScroll';
import selectedButtonHandler from '../helpers/selectedButtonHandler';


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

  selectedButtonHandler('#bottomNav a', 'Mui-selected');

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
            <VideoScroll page='home'/>
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
        <Route path='/inbox'>
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
          <div>
            <p>Playlists</p>
            <FormControl>
              <InputLabel id='select-label'>
                Recently Added
              </InputLabel>
              <Select
              labelId='select-label'
              id='select-label'
              >
                <MenuItem>A-Z</MenuItem>
                <MenuItem>Recently Added</MenuItem>
              </Select>
            </FormControl>
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
