import React, { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

import { addBugBash, updBugBash } from '../actions/BugBashActions';

const styles = {
  halfPanel : {
    display : 'inline-block',
    width   : '48%'
  }
};

class EditBugBash extends Component {
  static propTypes = {
    dispatch    : React.PropTypes.func.isRequired,
    handleClose : React.PropTypes.func.isRequired,
    open        : React.PropTypes.bool.isRequired,
    data        : React.PropTypes.shape({
      id   : React.PropTypes.number,
      info : React.PropTypes.object
    })
  };

  handleSubmit = () => {
    const { dispatch, data } = this.props;

    const { name, ticket } = this.refs;
    if (name.getValue().length) {
      const info = Immutable.Map({
        name      : name.getValue(),
        ticket    : ticket.getValue(),
        startTime : '',
        endTime   : ''
      });
      dispatch((data && data.id) ? updBugBash({
        id   : data.id,
        info : info
      }) : addBugBash(info));
    }
    this.props.handleClose();
  };

  render () {
    const { data } = this.props;
    const actions = [
      <FlatButton
        label = 'Cancel'
        primary
        keyboardFocused
        onTouchTap = {this.props.handleClose}
      />,
      <FlatButton
        label = 'Ok'
        primary
        keyboardFocused
        onTouchTap = {this.handleSubmit}
      />
    ];

    return (
      <div>
        <Dialog
          title = 'Dialog With Date Picker'
          actions = {actions}
          modal = {false}
          open = {this.props.open}
          onRequestClose = {this.props.handleClose}
        >
          <div style = {styles.halfPanel}>
            Name<br />
            <TextField
              id = 'name'
              ref = 'name'
              defaultValue = {data ? data.info.name : ''}
            /><br />
            Main Ticket<br />
            <TextField
              id = 'ticket'
              ref = 'ticket'
              defaultValue = {data ? data.info.ticket : ''}
            /><br />
          </div>
          <div style = {styles.halfPanel}>
            From<br />
            <div style = {styles.halfPanel}>
              <DatePicker
                ref = 'startDate'
                hintText = 'Bug Bash Start Date'
                mode = 'landscape'
              />
            </div>
            <div style = {styles.halfPanel}>
              <TimePicker
                ref = 'startTime'
                format = '24hr'
                hintText = 'Start Time'
              />
            </div>
            To<br />
            <div style = {styles.halfPanel}>
              <DatePicker
                ref = 'endDate'
                hintText = 'Bug Bash Start Date'
                mode = 'landscape'
              />
            </div>
            <div style = {styles.halfPanel}>
              <TimePicker
                ref = 'endTime'
                format = '24hr'
                hintText = 'End Time'
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(EditBugBash);
