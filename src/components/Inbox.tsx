import React, { useState } from 'react';
import { Notifications } from '@material-ui/icons';
import { Button, Tooltip } from '@material-ui/core';

const Inbox = (props:any) => {

  const [inboxTooltipOpen, setInboxTooltipOpen] = useState<boolean>(false)

  return (
    <div id='signed-out-blurb'>
      <Notifications />
      <p id='notificationsCallToAction'>Your notifications live here</p>
      <p>Don't miss the latest videos and more from your favorite channels.</p>
      <Tooltip title='Feature not supported' open={inboxTooltipOpen} onOpen={() => null}
        onClick={() => setInboxTooltipOpen(() => true)}
        onClose={() => {
          setInboxTooltipOpen(() => false);
      }}
      >
        <Button id='notificationsButton'>TURN ON NOTIFICATIONS</Button>
      </Tooltip>
    </div>
  );
}

export default Inbox;