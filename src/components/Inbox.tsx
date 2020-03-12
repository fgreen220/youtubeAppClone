import React from 'react';
import { Notifications } from '@material-ui/icons';
import { Button } from '@material-ui/core';

const Inbox = (props:any) => {
  return (
    <div id='signed-out-blurb'>
      <Notifications />
      <p id='notificationsCallToAction'>Your notifications live here</p>
      <p>Don't miss the latest videos and more from your favorite channels.</p>
      <Button id='notificationsButton'>TURN ON NOTIFICATIONS</Button>
    </div>
  );
}

export default Inbox;