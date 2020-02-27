import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.scss';

import BottomNav from './components/BottomNav';
import AppBar from './components/AppBar';

ReactDOM.render(
  <React.Fragment>
    <AppBar />
    <BottomNav />
  </React.Fragment>,
  document.querySelector('#example')
);