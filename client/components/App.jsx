import React, { Component } from 'react';

import MenuBar from './MenuBar';
import Dashboard from './Dashboard';

class App extends Component {
  render () {
    return (
      <div>
        <MenuBar />
        <Dashboard />
      </div>
    );
  }
}

export default App;
