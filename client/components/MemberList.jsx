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
    padding  : 0,
    fontSize : 13
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
class MemberList extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
    names    : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      tickets : React.PropTypes.arrayOf(React.PropTypes.shape({
        assignee    : React.PropTypes.string,
        link        : React.PropTypes.string.isRequired,
        priority    : React.PropTypes.string.isRequired,
        status      : React.PropTypes.string.isRequired,
        summary     : React.PropTypes.string.isRequired,
        ticket      : React.PropTypes.string.isRequired,
        labels      : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        fixVersions : React.PropTypes.arrayOf(React.PropTypes.string).isRequired
      })).isRequired,
      score : React.PropTypes.shape({
        1   : React.PropTypes.number.isRequired,
        2   : React.PropTypes.number.isRequired,
        3   : React.PropTypes.number.isRequired,
        4   : React.PropTypes.number.isRequired,
        sum : React.PropTypes.number.isRequired
      }).isRequired
    })).isRequired
  };

  _sortedNames = () => {
    const { names, infos } = this.props;
    names.sort((name1, name2) => {
      return infos[name1].score.sum > infos[name2].score.sum ? -1 : 1;
    });

    return names;
  };

  render () {
    const { infos } = this.props;
    const rows = this._sortedNames().map(name => {
      const { tickets, score } = infos[name];
      return (
        <div>
          <ListItem
            children = {
              <div style = {styles.lineContainer}>
                <div style = {[styles.elemInLine, styles.nameCol]}>{name}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{score[1]}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{score[2]}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{score[3]}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{score[4]}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{score.sum}</div>
              </div>
            }
            initiallyOpen = {false}
            primaryTogglesNestedList
            nestedItems = {[
              <ListItem
                children = {
                  <Table>
                    <TableHeader displaySelectAll = {false}>
                      <TableRow>
                        <TableHeaderColumn style = {{width: '17%'}}>Ticket & Priority</TableHeaderColumn>
                        <TableHeaderColumn style = {{width: '39%'}}>Summary</TableHeaderColumn>
                        <TableHeaderColumn style = {{width: '15%'}}>Assignee</TableHeaderColumn>
                        <TableHeaderColumn style = {{width: '9%'}}>Status</TableHeaderColumn>
                        <TableHeaderColumn style = {{width: '9%'}}>Fix Versions</TableHeaderColumn>
                        <TableHeaderColumn>Historical?</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox = {false}>
                      {tickets.map(i => {
                        return (
                          <TableRow>
                            <TableRowColumn style = {{width: '10%'}}>
                              <a
                                target = '_link'
                                href = {i.link}
                              >
                                {i.ticket}
                              </a>
                            </TableRowColumn>
                            <TableRowColumn style = {{width: '10%'}}>{`P${i.priority}`}</TableRowColumn>
                            <TableRowColumn style = {{width: '40%'}}>{i.summary}</TableRowColumn>
                            <TableRowColumn style = {{width: '15%'}}>{i.assignee}</TableRowColumn>
                            <TableRowColumn style = {{width: '10%'}}>{i.status}</TableRowColumn>
                            <TableRowColumn style = {{width: '9%'}}>{i.fixVersions.join(', ')}</TableRowColumn>
                            <TableRowColumn>{i.labels.includes('historical-debts') ? '√' : ''}</TableRowColumn>
                          </TableRow>
                        );
                      })}
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

export default connect(mapStateToProps)(MemberList);
