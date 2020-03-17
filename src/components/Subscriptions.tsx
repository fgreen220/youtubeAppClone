import React, { Fragment, useState } from 'react';
import IconScroll from './IconScroll';
import VideoScroll from './VideoScroll';
import { Subscriptions as SubscriptionsIcon } from '@material-ui/icons';
import { Button, Tooltip } from '@material-ui/core';
import windowResizer from '../helpers/windowResize';

const Subscriptions = (props:any) => {
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  windowResizer(setWindowWidth);
  const [signInTooltipOpen, setSignInTooltipOpen] = useState<boolean>(false);

  return (
    <Fragment>
      {props.isLoggedIn ?
        <Fragment>
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
      </Fragment>
      :
      <div id='signed-out-blurb'>
        <SubscriptionsIcon />
        <p>Don't miss new videos</p>
        <p>Sign in to see updates from your favorite YouTube channels</p>
        <Tooltip title='Feature not supported' open={signInTooltipOpen} onOpen={() => null}
          onClick={() => setSignInTooltipOpen(() => true)}
          onClose={() => {
            setSignInTooltipOpen(() => false);
        }}
        >
          <Button>SIGN IN</Button>
        </Tooltip>
      </div>
      }
    </Fragment>
  );
}

export default Subscriptions;