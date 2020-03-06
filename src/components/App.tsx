import React, { useState, Fragment } from 'react';
import AppBar from './AppBar';
import BottomNav from './BottomNav';
const App = () => {
  return (
    <Fragment>
      <AppBar />
      <BottomNav />
    </Fragment>
  );
}

export default App;