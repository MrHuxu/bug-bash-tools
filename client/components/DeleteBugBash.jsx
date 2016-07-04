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
      id   : React.PropTypes.number.isRequired,
      info : React.PropTypes.object.isRequired
    }).isRequired
  };

  handleConfirmDelete = () => {
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
        onTouchTap = {this.handleConfirmDelete}
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
