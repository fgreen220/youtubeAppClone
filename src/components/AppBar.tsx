import React, { useState, useRef } from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Slide,
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  SwipeableDrawer,
  TextField
 } from '@material-ui/core';
import {
  AccountCircle,
  CastConnected,
  Videocam,
  Search,
  ArrowBack,
  History,
  CallMade
} from '@material-ui/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const appBarStyles = makeStyles({
  root: {
    backgroundColor:'#212121'
  }
});

const HideOnScroll = (props: any) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({threshold:50});
  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

  const HeaderNav = (props: any):any => {
    const classes = useStyles();
    const appBarClasses = appBarStyles();

    const [videoSearchQuery, setVideoSearchQuery] = useState<string>('');
    const [prevSearchArray, setPrevSearchArray] = useState<string[]>([]);
  
    // const searchHandler = (searchQuery:string) => {
    //   fetch('http://localhost:3000/search', {
    //     method:'get',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'searchquery': `${searchQuery}`
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     data = JSON.parse(data);
    //     console.log(data);
    //   });
    // }
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const drawerAnchorRight = document.querySelector('.MuiDrawer-modal .MuiDrawer-paperAnchorRight');
    prevSearchArray.length>=1?drawerAnchorRight?.classList.add('hasPrevSearchResults'):null;
    const searchField = document.querySelector('#videoSearchBar');

    const searchRef = useRef<any>();

  return (
    <div className={`${classes.root} top-app-bar`}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar classes={{root: appBarClasses.root}}>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              ReactTube
            </Typography>
            <IconButton>
              <CastConnected />
            </IconButton>
            <IconButton>
              <Videocam />
            </IconButton>
            <SwipeableDrawer
              open={searchOpen}
              onOpen={() => console.log('open')}
              onClose={() => setSearchOpen(() => !searchOpen)}
              anchor='right'
              transitionDuration={0}
            >
            <div id='searchComponent'>
              <IconButton
                onClick={() => setSearchOpen(() => !searchOpen)}
              >
                <ArrowBack />
              </IconButton>
              <form autoComplete="off" onSubmit={(event:React.FormEvent<HTMLFormElement>) => {
                  event.persist();
                  event.preventDefault();
                  // searchHandler(videoSearchQuery);
                  setPrevSearchArray((prevArray:string[]) => [...prevArray, videoSearchQuery]);
              }}>
                <TextField inputRef={searchRef} id='videoSearchBar' placeholder='Video Search' 
                onChange={(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  event.persist();
                  setVideoSearchQuery(() => event.target?.value);
                  console.log(event);
                }} />
                <IconButton
                type='submit'
              >
                <Search />
              </IconButton>
              </form>
            </div>
            <div id='prevSearchQueriesContainer'>
              {prevSearchArray.length>=1? prevSearchArray.map((prevSearch:string, index) => {
                return (
                  <div className='prevSearchQueries' key={`${prevSearch}${index}`}>
                    <History />
                    <p>{prevSearch}</p>
                    <IconButton id='replace-search-value-button' 
                      onClick={() => {
                        searchRef.current? searchRef.current.value = prevSearchArray[index] : null; 
                        return setPrevSearchArray((prevSearches:string[]) => [prevSearches[index],...prevSearches.filter((item:string) => item !== prevSearches[index])]);
                      }}>
                      <CallMade id='replace-search-value-icon' />
                    </IconButton>
                  </div>
                );
              }):null}
            </div>
            </SwipeableDrawer>
            <IconButton 
              onClick={() => {
                setSearchOpen(() => !searchOpen);
              }
            }>
              <Search />
            </IconButton>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
}

export default HeaderNav;