import React, { Component } from 'react';
import Radium, { Style } from 'radium';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { pink500, yellow900, blueGrey400 } from 'material-ui/styles/colors';

import MenuBar from './MenuBar';
import SummaryChart from './SummaryChart';
import Summary from './Summary';
import BugBashList from './BugBashList';
import Dashboard from './Dashboard';

const styles = {
  base : {
    'html, body, .full-height' : {
      margin : 0,
      height : '100%'
    },

    a : {
      color          : '#00B7FF',
      textDecoration : 'none'
    }
  },

  container : {
    padding : '1%'
  },

  chartContainer : {
    margin : '20px 0 0 -8%',
    width  : '40%'
  },

  tableContainer : {
    margin  : '40px 0 0 0',
    padding : '0 0.1% 0.1% 0.1%',
    width   : '100%'
  },

  summary : {
    borderTop : `2px solid ${pink500}`
  },

  bugBashList : {
    borderTop : `2px solid ${yellow900}`,
    margin    : '20px 0 0 0'
  },

  memberList : {
    margin    : '20px 0 0 0',
    borderTop : `2px solid ${blueGrey400}`
  }
};

@Radium
class App extends Component {
  render () {
    return (
      <div style = {styles.container}>
        <Style rules = {styles.base} />
        <MenuBar />
        <div style = {styles.chartContainer}>
          <SummaryChart />
        </div>
        <div style = {styles.tableContainer}>

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

          <Card style = {styles.memberList}>
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
