import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Style } from 'radium';

import MenuBar from './MenuBar';
import BugBashList from './BugBashList';
import Dashboard from './Dashboard';

import commonStyles from '../styles/common';

const styles = {
  bugBashList : {
    verticalAlign : 'top',
    display       : 'inline-block',
    margin        : '20px 0 0 0',
    width         : '48%'
  },

  dashboard : {
    verticalAlign : 'top',
    display       : 'inline-block',
    margin        : '20px 0 0 1%',
    width         : '51%'
  }
};

class App extends Component {
  render () {
    return (
      <div>
        <Style rules = {commonStyles} />
        <MenuBar />
        <Card style = {styles.bugBashList}>
          <CardHeader
            title = 'Bug Bash List'
          />
          <CardText>
            <BugBashList />
          </CardText>
        </Card>
        <Card style = {styles.dashboard}>
          <CardHeader
            title = 'Dashboard'
          />
          <CardText>
            <Dashboard />
          </CardText>
        </Card>
      </div>
    );
  }
}

export default App;
