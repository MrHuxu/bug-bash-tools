import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

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
        <TableRow key = {`person-${name}`}>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{info[1]}</TableRowColumn>
          <TableRowColumn>{info[2]}</TableRowColumn>
          <TableRowColumn>{info[3]}</TableRowColumn>
          <TableRowColumn>{info[4]}</TableRowColumn>
          <TableRowColumn>{info.score}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div style = {this.props.style}>
        <Table selectable = {false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>P1</TableHeaderColumn>
              <TableHeaderColumn>P2</TableHeaderColumn>
              <TableHeaderColumn>P3</TableHeaderColumn>
              <TableHeaderColumn>P4</TableHeaderColumn>
              <TableHeaderColumn>Score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
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
