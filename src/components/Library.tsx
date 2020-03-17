import React, { Fragment, useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import {
  History,
  Slideshow,
  LocalOffer,
  WatchLater,
  ThumbUp,
  Add,
  Folder
} from '@material-ui/icons';
import VideoScroll from './VideoScroll';

const Library = (props:any) => {
  const [selectedString, setSelectedString] = useState<string>('Recently added');


  const handleChange = (event:React.ChangeEvent<{value: string}>) => {
    setSelectedString(event.target.value as string);
    setFilterTooltipOpen(() => true);
    setTimeout(() => setFilterTooltipOpen(() => false),3000)
  }

  const [testOpen, setTestOpen] = useState<boolean>(false);
  const [historyTooltipOpen, setHistoryTooltipOpen] = useState<boolean>(false);
  const [videosTooltipOpen, setVideosTooltipOpen] = useState<boolean>(false);
  const [purchasesTooltipOpen, setPurchasesTooltipOpen] = useState<boolean>(false);
  const [watchLaterTooltipOpen, setWatchLaterTooltipOpen] = useState<boolean>(false);
  const [filterTooltipOpen, setFilterTooltipOpen] = useState<boolean>(false);

  return (
    <Fragment>
      {testOpen ?
      <Fragment>
        <VideoScroll page='library' />
        <div id='library-middle'>
          <Tooltip title='Feature not supported' open={historyTooltipOpen} onOpen={() => null}
            onClick={() => setHistoryTooltipOpen(() => true)}
            onClose={() => {
              setHistoryTooltipOpen(() => false);
          }}
          >
            <Button
              variant='contained'
              startIcon={<History />}
            >
              History
            </Button>
          </Tooltip>
          <Tooltip title='Feature not supported' open={videosTooltipOpen} onOpen={() => null}
            onClick={() => setVideosTooltipOpen(() => true)}
            onClose={() => {
              setVideosTooltipOpen(() => false);
          }}
          >
            <Button
              variant='contained'
              startIcon={<Slideshow />}
            >
              Your Videos
            </Button>
          </Tooltip>
          <Tooltip title='Feature not supported' open={purchasesTooltipOpen} onOpen={() => null}
            onClick={() => setPurchasesTooltipOpen(() => true)}
            onClose={() => {
              setPurchasesTooltipOpen(() => false);
          }}
          >
            <Button
              variant='contained'
              startIcon={<LocalOffer />}
            >
              Purchases
            </Button>
          </Tooltip>
          <Tooltip title='Feature not supported' open={watchLaterTooltipOpen} onOpen={() => null}
            onClick={() => setWatchLaterTooltipOpen(() => true)}
            onClose={() => {
              setWatchLaterTooltipOpen(() => false);
          }}
          >
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
          </Tooltip>
        </div>
        <div id='library-bottom'>
          <div id='playlist-filter'>
          <p style={{display:'inline', justifyContent:'space-between'}}>Playlists</p>
          <Tooltip title='Feature not supported' open={filterTooltipOpen} onOpen={() => null}
            disableFocusListener={true}
            onClose={() => {
              setFilterTooltipOpen(() => false);
          }}
          >
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
          </Tooltip>
          </div>
          <Button
            variant='contained'
            startIcon={<Add id='addPlaylistIcon'/>}
          >
            <p id='newPlaylist'>New playlist</p>
          </Button>
          <Button
            variant='contained'
            startIcon={<ThumbUp />}
          >
            Liked videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Home videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Music videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Review videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Cooking videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Sports videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Trending videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Cat videos
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              setTestOpen(() => false);
            }}
          >
            <p>DEFAULT LIBRARY</p>
          </Button>
        </div>
      </Fragment>
      :
      <div id='signed-out-blurb'>
        <Folder />
        <p>Your notifications live here</p>
        <p>Don't miss the latest videos and more from your favorite channels.</p>
        <Button 
        onClick={
          () => {
            setTestOpen(() => true);
          }
        }>TEST LIBRARY</Button>
      </div>
      }
    </Fragment>
  );
}

export default Library;