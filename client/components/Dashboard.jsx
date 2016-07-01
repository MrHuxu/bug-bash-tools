import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class Dashboard extends Component {
  static propTypes = {
    style : React.PropTypes.object,
    ids   : ImmutablePropTypes.listOf(React.PropTypes.number).isRequired,
    infos : ImmutablePropTypes.mapOf(ImmutablePropTypes.contains({
      name   : React.PropTypes.string.isRequired,
      scores : ImmutablePropTypes.mapOf(React.PropTypes.number).isRequired
    })).isRequired
  };

  render () {
    const { ids, infos } = this.props;
    const rows = ids.toJS().map(id => {
      var info = infos.get(id.toString()).toJS();
      return (
        <TableRow key = {`person-${id}`}>
          <TableRowColumn>{info.name}</TableRowColumn>
          <TableRowColumn>{info.scores.p1}</TableRowColumn>
          <TableRowColumn>{info.scores.p2}</TableRowColumn>
          <TableRowColumn>{info.scores.p3}</TableRowColumn>
          <TableRowColumn>{info.scores.p4}</TableRowColumn>
          <TableRowColumn>{info.scores.p1 * 3 + info.scores.p2 * 2 + info.scores.p3 * 1 + info.scores.p4 * 0.5}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div style = {this.props.style}>
        <Table>
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
    ids   : state.person.get('ids'),
    infos : state.person.get('infos')
  };
};

export default connect(mapStateToProps)(Dashboard);
