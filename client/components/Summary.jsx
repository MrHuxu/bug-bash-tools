import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class Summary extends Component {
  static propTypes = {
    style : React.PropTypes.object
  };

  render () {
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
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect()(Summary);
