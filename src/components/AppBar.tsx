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
  Tooltip,
  Divider
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
  YouTube,
  MeetingRoom,
  Settings,
  Help
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
      fontWeight:600,
      cursor:'default'
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

const accountStyles = makeStyles({
  root: {
    '& .MuiDrawer-paperAnchorBottom' : {
      height:'100%',
      backgroundColor:'white'
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
    const accountClasses = accountStyles();
    const resultsClasses:Record<"modal", string> = searchResultsStyles();
    const videoRecordClasses = videoRecordStyles();

    const [videoSearchQuery, setVideoSearchQuery] = useState<string>('');
    const [prevSearchArray, setPrevSearchArray] = useState<string[]>([]);
    const [searchResultId, setSearchResultId] = useState<number>(-1);
    const [searchResultTooltipOpen, setSearchResultTooltipOpen] = useState<boolean>(false);
  
    const searchHandler = (searchQuery:string) => {
      props.setLoading(() => true);
      fetch('http://localhost:3000/search', {
        method:'get',
        headers: {
          'Content-Type': 'application/json',
          'searchquery': `${searchQuery}`
        }
      })
      .then(response => response.json())
      .then((data:string) => {
        data = JSON.parse(data);
        console.log(data);
        props.setSearchResultsArray((prevSearchArray:{}[]) => {
          return(
            Object.keys(prevSearchArray[0]).length === 0 ?
              [data]
            :
            Object.keys(prevSearchArray[0]).length !== 0 ?
              [...prevSearchArray, data]
            :
            [{}]
          );
        })
        props.setLoading(() => false);
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
    const [accountOpen, setAccountOpen] = useState<boolean>(false);
    const [signInTooltipOpen, setSignInTooltipOpen] = useState<boolean>(false);
    const [feedbackTooltipOpen, setFeedbackTooltipOpen] = useState<boolean>(false);
    const [settingsTooltipOpen, setSettingsTooltipOpen] = useState<boolean>(false);
    const [videoRecordTooltipOpen, setVideoRecordTooltipOpen] = useState<boolean>(false);
    const [castTooltipOpen, setCastTooltipOpen] = useState<boolean>(false);
    const [filterTooltipOpen, setFilterTooltipOpen] = useState<boolean>(false);
    const [resultsCastTooltipOpen, setResultsCastTooltipOpen] = useState<boolean>(false);

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
            <Tooltip title='Feature not supported' open={castTooltipOpen} onOpen={() => null}
                  onClick={() => setCastTooltipOpen(() => true)}
                  onClose={() => {
                    setCastTooltipOpen(() => false);
                }}
                >
              <IconButton>
                <CastConnected />
              </IconButton>
            </Tooltip>
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
              <Tooltip title='Feature not supported' open={videoRecordTooltipOpen} onOpen={() => null}
                onClick={() => setVideoRecordTooltipOpen(() => true)}
                onClose={() => {
                  setVideoRecordTooltipOpen(() => false);
              }}
              >
                <Button>OPEN SETTINGS</Button>
              </Tooltip>
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
                  videoSearchQuery !== '' ? searchHandler(videoSearchQuery): null;
                  if(event.target.elements[0].value !== ''){
                    setPrevSearchArray((prevArray:string[]) => {
                      return (
                        !prevArray.includes(videoSearchQuery)?
                      [videoSearchQuery, ...prevArray.filter((item:string) => item !== videoSearchQuery)]
                      :
                      [videoSearchQuery, ...prevArray.filter((prevSearches:string) => prevSearches !== videoSearchQuery)]
                      );
                    });
                    setSearchResultsDisplay(() => true);
                  } else {
                    setSearchTooltipOpen(() => true);
                  }
              }}>
                <TextField inputRef={searchRef} autoFocus={true} id='videoSearchBar' placeholder='Video Search' 
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
                  event.target.id === 'prevSearchQuery' || event.target === 'path'){
                    console.log(event);
                    setVideoSearchQuery(() => event.target.innerText);
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
                            console.log(prevSearch);
                            searchRef.current? searchRef.current.value = prevSearch : null; 
                            // return setPrevSearchArray((prevSearches:string[]) => [prevSearch,...prevSearches.filter((item:string) => item !== prevSearch)]);
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
                <TextField value={videoSearchQuery !== ''?`${videoSearchQuery}`:''} id='videoSearchResultsBar'
                 onFocus={() => setSearchResultsDisplay(() => false)}/>
                <div id='searchResultButtonGroup'>
                  <IconButton onClick={() => {
                    setSearchResultsDisplay(() => false);
                    searchRef.current.value = '';
                    }
                  }>
                    <Clear />
                  </IconButton>
                  <Tooltip title='Feature not supported' open={resultsCastTooltipOpen} onOpen={() => null}
                    onClick={() => setResultsCastTooltipOpen(() => true)}
                    onClose={() => {
                      setResultsCastTooltipOpen(() => false);
                  }}
                  >
                    <IconButton>
                      <CastConnected />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Feature not supported' open={filterTooltipOpen} onOpen={() => null}
                    onClick={() => setFilterTooltipOpen(() => true)}
                    onClose={() => {
                      setFilterTooltipOpen(() => false);
                  }}
                  >
                    <IconButton>
                      <Tune />
                    </IconButton>
                  </Tooltip>
                </div>
              </form>
              <div id='searchResultsList'>
                {Object.keys(props.searchResultsArray[0]).length !== 0 ?
                    props.searchResultsArray[props.searchResultsArray.length-1].items.map((result:{[itemObject:string]:any}, index:number) => {
                      return <div key={`${result.id.videoId}^${index}`} id='searchResultsDrawer' onClick={() => {
                        props.setSearchResultIndex(() => index);
                        props.setIsSearchResult(() => true);
                        props.setCurrentVideoId(() => {
                          console.log(props.searchResultsArray[props.searchResultsArray.length-1]['items'][index]['id']['videoId']);
                          return `${props.searchResultsArray[props.searchResultsArray.length-1]['items'][index]['id']['videoId']}`;
                      });
                        props.passEmbedUrl(`//www.youtube.com/embed/${props.searchResultsArray[props.searchResultsArray.length-1]['items'][index]['id']['videoId']}`);
                      }}>
                        <img src={
                          result.snippet.thumbnails.high.url ?
                            result.snippet.thumbnails.high.url
                        : result.snippet.thumbnails.medium.url ?
                            result.snippet.thumbnails.medium.url
                        : result.snippet.thumbnails.default.url ?
                            result.snippet.thumbnails.default.url
                        : '../assets/no_thumbnail.jpg'
                        }/>
                        <div className='videoSearchInfo'>
                          <p>{result.snippet.title}</p>
                          <p>{result.snippet.channelTitle}</p>
                        </div>
                        <Tooltip title='Feature not supported' open={searchResultId === index ? searchResultTooltipOpen : false} onOpen={() => null}
                          onClick={() => setSearchResultTooltipOpen(() => true)}
                          onClose={() => {
                            setSearchResultTooltipOpen(() => false);
                        }}
                        >
                          <IconButton id='search-result-button' onClick={() => {
                            setSearchResultId(() => index);
                            setSearchResultTooltipOpen(() => true);
                          }}>
                            <MoreVert id='search-result-icon' />
                          </IconButton>
                        </Tooltip>
                      </div>
                    })
                 : null 
                }

                {/* <div id='searchResultsDrawer'>
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
                </div> */}
              </div>
            </SwipeableDrawer>
            <IconButton 
              onClick={() => {
                setSearchOpen(() => true);
              }
            }>
              <Search />
            </IconButton>
            <IconButton onClick = {() => {
              setAccountOpen(() => true);
            }}>
              <AccountCircle />
            </IconButton>
            <SwipeableDrawer
              open={accountOpen}
              onOpen={() => console.log('account drawer open')}
              onClose={() => console.log('account drawer closed')}
              classes={{root:accountClasses.root}}
              anchor='bottom'
            >
              <AppBar elevation={1}>
                <Toolbar>
                  <IconButton onClick={
                    () => {
                      setAccountOpen(() => false);
                    }
                  }>
                    <Clear />
                  </IconButton>
                  <h1>Account</h1>
                </Toolbar>
              </AppBar>
              <div id='account-drawer'>
                <MeetingRoom id='account-drawer-icon'/>
                <p>Sign in now to upload, save, and comment on videos.</p>
                <Tooltip title='Feature not supported' open={signInTooltipOpen} onOpen={() => null}
                  onClick={() => setSignInTooltipOpen(() => true)}
                  onClose={() => {
                    setSignInTooltipOpen(() => false);
                }}
                >
                  <Button>SIGN IN</Button>
                </Tooltip>
                <Divider />
                <div id='account-drawer-bottom'>
                <Tooltip title='Feature not supported' open={settingsTooltipOpen} onOpen={() => null}
                  onClick={() => setSettingsTooltipOpen(() => true)}
                  onClose={() => {
                    setSettingsTooltipOpen(() => false);
                }}
                >
                  <Button
                    variant='contained'
                    startIcon={<Settings />}
                  >
                    <p>Settings</p>
                  </Button>
                </Tooltip>
                <Tooltip title='Feature not supported' open={feedbackTooltipOpen} onOpen={() => null}
                  onClick={() => setFeedbackTooltipOpen(() => true)}
                  onClose={() => {
                    setFeedbackTooltipOpen(() => false);
                }}
                >
                  <Button
                    variant='contained'
                    startIcon={<Help />}
                  >
                    <p>Help &amp; feedback</p>
                  </Button>
                </Tooltip>
                </div>
              </div>
            </SwipeableDrawer>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
}

export default HeaderNav;