import * as React from 'react';
import { 
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
 } from '@material-ui/core';
import {
  Home,
  Whatshot,
  Subscriptions,
  Mail,
  VideoLibrary
} from '@material-ui/icons';


const useStyles = makeStyles({
  root: {
    width: '100vw',
    backgroundColor: '#212121',
    position:'fixed',
    bottom:0
  }
});


const buttonStyles = makeStyles({
  root: {
    display:'grid',
    maxWidth:'none',
    color: '#9e9e9e',
  },
  selected: {
    color: "#FFFFFF"
  },
  label: {
    color: '#9e9e9e'
  }
}, { name: 'MuiBottomNavigationAction' });




export default function BottomNav(props: any) {
  const classes = useStyles();
  const btnClasses = buttonStyles();
  const [value, setValue] = React.useState(0);

  return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction classes={{root: btnClasses.root, selected: btnClasses.selected, label: btnClasses.label}} label='Home' icon={<Home />} />
        <BottomNavigationAction classes={{root: btnClasses.root, selected: btnClasses.selected, label: btnClasses.label}} label='Trending' icon={<Whatshot />} />
        <BottomNavigationAction classes={{root: btnClasses.root, selected: btnClasses.selected, label: btnClasses.label}} label='Subscriptions' icon={<Subscriptions />} />
        <BottomNavigationAction classes={{root: btnClasses.root, selected: btnClasses.selected, label: btnClasses.label}} label='Inbox' icon={<Mail />} />
        <BottomNavigationAction classes={{root: btnClasses.root, selected: btnClasses.selected, label: btnClasses.label}} label='Library' icon={<VideoLibrary />} />
      </BottomNavigation>
  );
}
