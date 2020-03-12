import React, { useState, useRef, useEffect } from 'react';
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
  TextField,
  Link as MaterialLink,
  Button,
  Tooltip
 } from '@material-ui/core';
import {
  AccountCircle,
  CastConnected,
  Videocam,
  Search,
  ArrowBack,
  History,
  CallMade,
  MoreVert,
  Tune,
  Clear,
  YouTube
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
      color:'black',
      fontWeight:600
    },
  }),
);

const appBarStyles = makeStyles({
  root: {
      backgroundColor:'white'
  }
});

const searchResultsStyles = makeStyles({
  modal: {
    '& .MuiDrawer-paperAnchorRight' : {
      width:'100%',
      backgroundColor:'#F5F5F5'
    }
  }
})

const videoRecordStyles = makeStyles({
  modal: {
    '& .MuiDrawer-paperAnchorBottom' : {
      height:'100%',
      backgroundColor:'#38383a'
    }
  }
})

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
    const resultsClasses:Record<"modal", string> = searchResultsStyles();
    const videoRecordClasses = videoRecordStyles();

    const [videoSearchQuery, setVideoSearchQuery] = useState<string>('');
    const [prevSearchArray, setPrevSearchArray] = useState<string[]>([]);
  
    const searchHandler = (searchQuery:string) => {
      fetch('http://localhost:3000/search', {
        method:'get',
        headers: {
          'Content-Type': 'application/json',
          'searchquery': `${searchQuery}`
        }
      })
      .then(response => response.json())
      .then(data => {
        data = JSON.parse(data);
        console.log(data);
      });
    }
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [dummyState, setDummyState] = useState<boolean>(false);
    const [searchResultsDisplay, setSearchResultsDisplay] = useState<boolean>(false);

    const searchRef = useRef<any>();
    const searchDrawer = document.querySelector('.MuiDrawer-paperAnchorRight');
    useEffect(() => {
      searchOpen?searchDrawer?.classList.add('searchDrawer'):null;
      searchResultsDisplay?searchDrawer?.classList.add('searchResultsDrawer'):null;
      return(() => {
        searchDrawer?searchDrawer.classList.remove('searchDrawer'):null;
        searchResultsDisplay?searchDrawer?.classList.remove('searchResultsDrawer'):null;
      })
    })
    const [videoRecordOpen, setVideoRecordOpen] = useState<boolean>(false);
    const [searchTooltipOpen, setSearchTooltipOpen] = useState<boolean>(false);
  return (
    <div className={`${classes.root} top-app-bar`}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar classes={{root: appBarClasses.root}}>
          <Toolbar>
            <YouTube id='youtubeIcon'/>
            <Typography variant='h6' className={classes.title}>
              ReactTube
            </Typography>
            <IconButton>
              <CastConnected />
            </IconButton>
            <IconButton onClick={() => {
                setVideoRecordOpen(() => true)
              }
            }>
              <Videocam />
            </IconButton>
            <SwipeableDrawer
              classes={{modal:videoRecordClasses.modal}}
              open={videoRecordOpen}
              anchor='bottom'
              onOpen={() => console.log('video record open')}
              onClose={() => {
                console.log('video record drawer closed');
                setVideoRecordOpen(() => false);
              }
            }>
              <IconButton id='videoRecordDrawerClose' onClick={() => {
                  setVideoRecordOpen(() => false);
                }
              }>
                <Clear />
              </IconButton>
              <div id='videoRecordContainer'>
                <Videocam />
                <p id='videoRecordCallToAction'>Start the show</p>
                <p>To get started, go to Settings > YouTube and allow access to Photos, Camera, and Microphone</p>
                <Button>OPEN SETTINGS</Button>
              </div>
            </SwipeableDrawer>
            <SwipeableDrawer
              open={searchOpen}
              onOpen={() => console.log('5')}
              onClose={() => {
                console.log('search drawer closed');
                setSearchOpen(() => false)
              }}
              anchor='right'
              transitionDuration={0}
            >
            <div id='searchComponent'>
              <IconButton
                onClick={() => setSearchOpen(() => !searchOpen)}
              >
                <ArrowBack />
              </IconButton>
              <form autoComplete="off" onSubmit={(event:any) => {
                  event.persist();
                  event.preventDefault();
                  // searchHandler(videoSearchQuery);
                  if(event.target.elements[0].value !== ''){
                    setPrevSearchArray((prevArray:string[]) => {
                      return (
                        !prevArray.includes(videoSearchQuery)?
                      [...prevArray, videoSearchQuery]
                      :
                      [videoSearchQuery, ...prevArray.filter((prevSearches:string) => prevSearches !== videoSearchQuery)]
                      );
                    });
                    setSearchResultsDisplay(() => true);
                  } else {
                    setSearchTooltipOpen(() => true);
                  }
              }}>
                <TextField inputRef={searchRef} id='videoSearchBar' placeholder='Video Search' 
                  onChange={(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    event.persist();
                    event.target?.value !== ''? setVideoSearchQuery(() => event.target?.value):null;
                  }
                } />
                <Tooltip title='Enter search query' open={searchTooltipOpen} onOpen={() => null}
                 onClose={() => {
                   setSearchTooltipOpen(() => false);
                }}
                >
                  <IconButton
                  type='submit'
                  >
                    <Search />
                  </IconButton>
                </Tooltip>
              </form>
            </div>
            <MaterialLink underline='none' 
              onClick={(event:any) => {
                event.persist();
                if(event.target.className === 'prevSearchQueries' || event.target.id === 'searchHistoryIcon' ||
                  event.target.id === 'prevSearchQuery' || event.target.tagName === 'path'){
                    console.log(event);
                    setSearchOpen(() => false);
                    setSearchResultsDisplay(() => true);
                  }
              }
            }>
              <div id='prevSearchQueriesContainer'>
                  {prevSearchArray.length>=1? prevSearchArray.map((prevSearch:string, index) => {
                    return (
                      <div className='prevSearchQueries' key={`${prevSearch}${index}`}>
                        <History id='searchHistoryIcon'/>
                        <p id='prevSearchQuery'>{prevSearch}</p>
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
            </MaterialLink>
            </SwipeableDrawer>
            <SwipeableDrawer
              classes={{modal:resultsClasses.modal}}
              anchor='right'
              open={searchResultsDisplay}
              transitionDuration={{enter:225, exit:0}}
              onOpen={() => console.log('search result display is open')}
              onClose={() => {
                setSearchResultsDisplay(() => false);
                console.log('search result display closed');
              }}
            >
              <form autoComplete="off" id='searchResultsBar'>
                <IconButton onClick={() => setSearchResultsDisplay(() => false)}>
                  <ArrowBack />
                </IconButton>
                <TextField value={searchRef?`${searchRef.current?.value}`:''} id='videoSearchBar' placeholder='Video Search' 
                 onFocus={() => setSearchResultsDisplay(() => false)}/>
                <div id='searchResultButtonGroup'>
                  <IconButton>
                    <Clear />
                  </IconButton>
                  <IconButton>
                    <CastConnected />
                  </IconButton>
                  <IconButton>
                    <Tune />
                  </IconButton>
                </div>
              </form>
              <div id='searchResultsList'>
                <div id='searchResultsDrawer'>
                  <img src='../assets/no_thumbnail.jpg'/>
                  <div className='videoSearchInfo'>
                    <p>Video Description</p>
                    <p>Video and Channel Info</p>
                    <p>More Info</p>
                  </div>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </div>
                <div id='searchResultsDrawer'>
                  <img src='../assets/no_thumbnail.jpg'/>
                  <div className='videoSearchInfo'>
                    <p>Video Description</p>
                    <p>Video and Channel Info</p>
                    <p>More Info</p>
                  </div>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </div>
              </div>
            </SwipeableDrawer>
            <IconButton 
              onClick={() => {
                setSearchOpen(() => true);
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