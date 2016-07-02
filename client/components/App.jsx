import React, { Component } from 'react';
import Radium from 'radium';
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
    '@media (max-width: 1200px)': {
      width: '100%'
    },

    '@media (min-width: 1201px)': {
      width: '48%'
    }
  },

  dashboard : {
    verticalAlign : 'top',
    display       : 'inline-block',
    '@media (max-width: 1200px)': {
      margin: '20px 0 0 0',
      width: '100%'
    },

    '@media (min-width: 1201px)': {
      margin: '20px 0 0 1%',
      width: '51%'
    }
  }
};

@Radium
class App extends Component {
  render () {
    return (
      <div>
        <Style rules = {commonStyles} />
        <MenuBar />
        <div style = {styles.bugBashList}>
          <Card>
            <CardHeader
              title = 'Bug Bash List'
            />
            <CardText>
              <BugBashList />
            </CardText>
          </Card>
        </div>
        <div style = {styles.dashboard}>
          <Card>
            <CardHeader
              title = 'Dashboard'
            />
            <CardText>
              <Dashboard />
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
