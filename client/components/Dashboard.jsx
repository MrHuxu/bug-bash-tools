import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styles = {
  headerContainer : {
    padding : 20
  },

  lineContainer : {
    padding : 0
  },

  elemInLine : {
    display : 'inline-block'
  },

  nameCol : {
    width : '15%'
  },

  scoreCol : {
    width : '17%'
  }
};

@Radium
class Dashboard extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
    names    : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      1     : React.PropTypes.number.isRequired,
      2     : React.PropTypes.number.isRequired,
      3     : React.PropTypes.number.isRequired,
      4     : React.PropTypes.number.isRequired,
      score : React.PropTypes.number.isRequired
    })).isRequired
  };

  sortedNames = () => {
    const { names, infos } = this.props;
    names.sort((name1, name2) => {
      return infos[name1].score > infos[name2].score ? -1 : 1;
    });

    return names;
  };

  render () {
    const { infos } = this.props;
    const rows = this.sortedNames().map(name => {
      var info = infos[name];
      return (
        <div>
          <ListItem
            children = {
              <div style = {styles.lineContainer}>
                <div style = {[styles.elemInLine, styles.nameCol]}>{name}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{info[1]}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{info[2]}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{info[3]}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{info[4]}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{info.score}</div>
              </div>
            }
            initiallyOpen = {false}
            primaryTogglesNestedList
            nestedItems = {[
              <ListItem
                children = {
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableRowColumn>1</TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>2</TableRowColumn>
                        <TableRowColumn>Randal White</TableRowColumn>
                        <TableRowColumn>Unemployed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>3</TableRowColumn>
                        <TableRowColumn>Stephanie Sanders</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>4</TableRowColumn>
                        <TableRowColumn>Steve Brown</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
                }
              />
            ]}
          />
          <Divider />
        </div>
      );
    });

    return (
      <div style = {this.props.style}>
        <div style = {styles.headerContainer}>
          <div style = {[styles.elemInLine, styles.nameCol]}>Name</div>
          <div style = {[styles.elemInLine, styles.scoreCol]}>P1</div>
          <div style = {[styles.elemInLine, styles.scoreCol]}>P2</div>
          <div style = {[styles.elemInLine, styles.scoreCol]}>P3</div>
          <div style = {[styles.elemInLine, styles.scoreCol]}>P4</div>
          <div style = {[styles.elemInLine, styles.scoreCol]}>Score</div>
        </div>
        <Divider />
        <List>
          {rows}
        </List>
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    names : state.member.names,
    infos : state.member.infos
  };
};

export default connect(mapStateToProps)(Dashboard);
