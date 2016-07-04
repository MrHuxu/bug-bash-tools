import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class Summary extends Component {
  static propTypes = {
    style : React.PropTypes.object
  };

  render () {
    const { names, infos } = this.props;
    var sum = {1: 0, 2: 0, 3: 0, 4: 0};
    names.forEach(name => {
      sum[1] += infos[name][1];
      sum[2] += infos[name][2];
      sum[3] += infos[name][3];
      sum[4] += infos[name][4];
    });

    return (
      <div style = {this.props.style}>
        <Table selectable = {false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>P1</TableHeaderColumn>
              <TableHeaderColumn>P2</TableHeaderColumn>
              <TableHeaderColumn>P3</TableHeaderColumn>
              <TableHeaderColumn>P4</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>{sum[1]}</TableRowColumn>
              <TableRowColumn>{sum[2]}</TableRowColumn>
              <TableRowColumn>{sum[3]}</TableRowColumn>
              <TableRowColumn>{sum[4]}</TableRowColumn>
            </TableRow>
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

export default connect(mapStateToProps)(Summary);
