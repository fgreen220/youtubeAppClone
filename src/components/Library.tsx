import React, { Fragment, useState } from 'react';
import {
  Button,
  FormControl,
  Select,
  MenuItem
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
  const [selectedString, setSelectedString] = useState('Recently added');


  const handleChange = (event:React.ChangeEvent<{value: unknown}>) => {
    setSelectedString(event.target.value as string)
  }

  return (
    <Fragment>
      {/* props.isLoggedIn */}
      {true ?
      <Fragment>
        <VideoScroll page='library' />
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
            Liked videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Liked videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Liked videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Liked videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Liked videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Liked videos
          </Button>
          <Button
            variant='contained'
            startIcon={<img src='../assets/no_thumbnail.jpg' className='playlistPicture'/>}
          >
            Liked videos
          </Button>
        </div>
      </Fragment>
      :
      <div id='signed-out-blurb'>
        <Folder />
        <p>Your notifications live here</p>
        <p>Don't miss the latest videos and more from your favorite channels.</p>
        <button>TURN ON NOTIFICATIONS</button>
      </div>
      }
    </Fragment>
  );
}

export default Library;