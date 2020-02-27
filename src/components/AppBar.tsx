import React from 'react';
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
  IconButton
 } from '@material-ui/core';
import {
  AccountCircle,
  CastConnected,
  Videocam,
  Search
} from '@material-ui/icons';

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

  return (
    <div className={classes.root}>
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
            <IconButton>
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