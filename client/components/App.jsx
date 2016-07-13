import React, { Component } from 'react';
import { Style } from 'radium';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { pink500, yellow900, blueGrey400 } from 'material-ui/styles/colors';

import MenuBar from './MenuBar';
import HistoricalChart from './HistoricalChart';
import SummaryChart from './SummaryChart';
import RankChart from './RankChart';
import BugBashList from './BugBashList';
import MemberList from './MemberList';

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

  summaryChart : {
    display : 'inline-block',
    margin  : '10px 0 0 -10%',
    width   : '40%',
    height  : '450px'
  },

  historicalChart : {
    display : 'inline-block',
    margin  : '10px 0 0 -20%',
    width   : '40%',
    height  : '450px'
  },

  rankChart : {
    margin  : '40px 0 0 -13%',
    display : 'inline-block',
    width   : '63%',
    height  : '450px'
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

class App extends Component {
  render () {
    return (
      <div style = {styles.container}>
        <Style rules = {styles.base} />
        <MenuBar />

        <SummaryChart style = {styles.summaryChart} />

        <HistoricalChart style = {styles.historicalChart} />

        <RankChart style = {styles.rankChart} />

        <div style = {styles.tableContainer}>

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
              <MemberList />
            </CardText>
          </Card>

        </div>
      </div>
    );
  }
}

export default App;
