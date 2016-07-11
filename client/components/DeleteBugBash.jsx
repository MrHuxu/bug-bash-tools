import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { delBugBash } from '../actions/BugBashActions';

class DeleteBugBash extends Component {
  static propTypes = {
    dispatch    : React.PropTypes.func.isRequired,
    handleClose : React.PropTypes.func.isRequired,
    open        : React.PropTypes.bool.isRequired,
    data        : React.PropTypes.shape({
      _id  : React.PropTypes.string.isRequired,
      info : React.PropTypes.shape({
        name      : React.PropTypes.string.isRequired,
        ticket    : React.PropTypes.string.isRequired,
        startTime : React.PropTypes.string.isRequired,
        endTime   : React.PropTypes.string.isRequired
      })
    }).isRequired
  };

  _confirmDelete = () => {
    const { dispatch, data } = this.props;
    dispatch(delBugBash(data.info));
    this.props.handleClose();
  };

  render () {
    const { data } = this.props;
    const actions = [
      <FlatButton
        label = 'Cancel'
        secondary
        onTouchTap = {this.props.handleClose}
      />,
      <FlatButton
        label = 'Delete'
        primary
        keyboardFocused
        onTouchTap = {this._confirmDelete}
      />
    ];

    return (
      <div>
        <Dialog
          title = 'Delete Confirmation'
          actions = {actions}
          modal = {false}
          open = {this.props.open}
          onRequestClose = {this.props.handleClose}
        >
          Delete <strong>{data.info.name}</strong>({data.info.ticket})?
        </Dialog>
      </div>
    );
  }
}

export default connect()(DeleteBugBash);
