import React, { Component } from 'react';
import Radium, { Style } from 'radium';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { yellow900, blueGrey400 } from 'material-ui/styles/colors';

import MenuBar from './MenuBar';
import BugBashList from './BugBashList';
import Dashboard from './Dashboard';

const styles = {
  base : {
    'html, body, .full-height' : {
      height : '100%'
    },

    a : {
      color          : '#00B7FF',
      textDecoration : 'none'
    }
  },

  bugBashList : {
    verticalAlign                : 'top',
    display                      : 'inline-block',
    margin                       : '20px 0 0 0',
    borderTop                    : `2px solid ${yellow900}`,
    '@media (max-width: 1200px)' : {
      width : '100%'
    },

    '@media (min-width: 1201px)' : {
      width : '48%'
    }
  },

  dashboard : {
    verticalAlign                : 'top',
    display                      : 'inline-block',
    borderTop                    : `2px solid ${blueGrey400}`,
    '@media (max-width: 1200px)' : {
      margin : '20px 0 0 0',
      width  : '100%'
    },

    '@media (min-width: 1201px)' : {
      margin : '20px 0 0 1%',
      width  : '51%'
    }
  }
};

@Radium
class App extends Component {
  render () {
    return (
      <div>
        <Style rules = {styles.base} />
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
