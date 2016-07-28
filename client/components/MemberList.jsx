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
    width : '14%'
  }
};

@Radium
class MemberList extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
    names    : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      Tickets : React.PropTypes.arrayOf(React.PropTypes.shape({
        Assignee    : React.PropTypes.string,
        Link        : React.PropTypes.string.isRequired,
        Priority    : React.PropTypes.string.isRequired,
        Status      : React.PropTypes.string.isRequired,
        Summary     : React.PropTypes.string.isRequired,
        Key         : React.PropTypes.string.isRequired,
        Labels      : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        FixVersions : React.PropTypes.arrayOf(React.PropTypes.string).isRequired
      })).isRequired,
      Score : React.PropTypes.shape({
        P1         : React.PropTypes.number.isRequired,
        P2         : React.PropTypes.number.isRequired,
        P3         : React.PropTypes.number.isRequired,
        P4         : React.PropTypes.number.isRequired,
        Historical : React.PropTypes.number.isRequired,
        Sum        : React.PropTypes.number.isRequired
      }).isRequired
    })).isRequired
  };

  _sortedNames = () => {
    const { names, infos } = this.props;
    names.sort((name1, name2) => {
      return infos[name1].Score.Sum > infos[name2].Score.Sum ? -1 : 1;
    });

    return names;
  };

  render () {
    const { infos } = this.props;
    const rows = this._sortedNames().map(name => {
      const { Tickets, Score } = infos[name];
      return (
        <div key = {name}>
          <ListItem
            children = {
              <div style = {styles.lineContainer}>
                <div style = {[styles.elemInLine, styles.nameCol]}>{name}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{Score.P1}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{Score.P2}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{Score.P3}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{Score.P4}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{Score.Historical}</div>
                <div style = {[styles.elemInLine, styles.scoreCol]}>{Score.Sum}</div>
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
                      {Tickets.map(t => {
                        return (
                          <TableRow key = {`${name}:ticket:${t.Key}`}>
                            <TableRowColumn style = {{width: '10%'}}>
                              <a
                                target = '_Link'
                                href = {t.Link}
                              >
                                {t.Key}
                              </a>
                            </TableRowColumn>
                            <TableRowColumn style = {{width: '10%'}}>{`P${t.Priority}`}</TableRowColumn>
                            <TableRowColumn style = {{width: '40%'}}>{t.Summary}</TableRowColumn>
                            <TableRowColumn style = {{width: '15%'}}>{t.Assignee}</TableRowColumn>
                            <TableRowColumn style = {{width: '10%'}}>{t.Status}</TableRowColumn>
                            <TableRowColumn style = {{width: '9%'}}>{t.FixVersions && t.FixVersions.join(', ')}</TableRowColumn>
                            <TableRowColumn>{(t.Labels && t.Labels.indexOf('historical-debts')) !== -1 ? '√' : ''}</TableRowColumn>
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
          <div style = {[styles.elemInLine, styles.scoreCol]}>Historical</div>
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
