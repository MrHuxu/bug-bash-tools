import React, { Component } from 'react';

import MenuBar from './MenuBar';
import BugBashList from './BugBashList';
import Dashboard from './Dashboard';

class App extends Component {
  render () {
    return (
      <div>
        <MenuBar />
        <BugBashList />
        <Dashboard />
      </div>
    );
  }
}

export default App;
