import React from 'react';
import { Notifications } from '@material-ui/icons';

const Inbox = (props:any) => {
  return (
    <div id='signed-out-blurb'>
      <Notifications />
      <p>Your notifications live here</p>
      <p>Don't miss the latest videos and more from your favorite channels.</p>
      <button>TURN ON NOTIFICATIONS</button>
    </div>
  );
}

export default Inbox;