import React, { Component } from 'react';
import Radium, { Style } from 'radium';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { pink500, yellow900, blueGrey400 } from 'material-ui/styles/colors';

import MenuBar from './MenuBar';
import Summary from './Summary';
import BugBashList from './BugBashList';
import Dashboard from './Dashboard';

const styles = {
  base : {
    'html, body, .full-height' : {
      margin: 0,
      height : '100%'
    },

    a : {
      color          : '#00B7FF',
      textDecoration : 'none'
    }
  },

  container: {
    '@media (min-width: 1201px)' : {
        padding: '1%',
        height: '90%',
        overflowY: 'hidden'
     }
  },

  leftPanel : {
    verticalAlign                : 'top',
    display                      : 'inline-block',
    margin                       : '20px 0 0 0',
    '@media (max-width: 1200px)' : {
      width : '100%'
    },

    '@media (min-width: 1201px)' : {
      width : '48%',
      height : '100%',
      height : '90%',
      overflowY: 'auto'
    }
  },

  summary : {
    borderTop : `2px solid ${pink500}`
  },

  bugBashList : {
    borderTop : `2px solid ${yellow900}`,
    margin    : '20px 0 0 0'
  },

  rightPanel : {
    verticalAlign                : 'top',
    display                      : 'inline-block',
    borderTop                    : `2px solid ${blueGrey400}`,
    '@media (max-width: 1200px)' : {
      margin : '20px 0 0 0',
      width  : '100%'
    },

    '@media (min-width: 1201px)' : {
      margin : '20px 0 0 1%',
      width  : '51%',
      height : '90%',
      overflowY: 'auto'
    }
  }
};

@Radium
class App extends Component {
  render () {
    return (
      <div style = {styles.container}>
        <Style rules = {styles.base} />
        <MenuBar />
        <div style = {styles.leftPanel}>

          <Card style = {styles.summary}>
            <CardHeader
              title = 'Summary'
            />
            <CardText>
              <Summary />
            </CardText>
          </Card>

          <Card style = {styles.bugBashList}>
            <CardHeader
              title = 'Bug Bash List'
            />
            <CardText>
              <BugBashList />
            </CardText>
          </Card>

        </div>
        <div style = {styles.rightPanel}>

          <Card>
            <CardHeader
              title = 'Member List'
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
