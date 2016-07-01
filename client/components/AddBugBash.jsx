import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

const styles = {
  halfPanel : {
    display : 'inline-block',
    width   : '48%'
  }
};

class AddBugBash extends Component {
  state = {
    open : false
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render () {
    const actions = [
      <FlatButton
        label = 'Ok'
        primary
        keyboardFocused
        onTouchTap = {this.handleClose}
      />
    ];

    return (
      <div>
        <RaisedButton
          primary
          label = 'Add Bug Bash'
          onTouchTap = {this.handleOpen}
        />
        <Dialog
          title = 'Dialog With Date Picker'
          actions = {actions}
          modal = {false}
          open = {this.state.open}
          onRequestClose = {this.handleClose}
        >
          <div style = {styles.halfPanel}>
            Name<br />
            <TextField /><br />
            Main Ticket<br />
            <TextField /><br />
          </div>
          <div style = {styles.halfPanel}>
            From<br />
            <div style = {styles.halfPanel}>
              <DatePicker
                hintText = 'Bug Bash Start Date'
                mode = 'landscape'
              />
            </div>
            <div style = {styles.halfPanel}>
              <TimePicker
                format = '24hr'
                hintText = 'Start Time'
              />
            </div>
            To<br />
            <div style = {styles.halfPanel}>
              <DatePicker
                hintText = 'Bug Bash Start Date'
                mode = 'landscape'
              />
            </div>
            <div style = {styles.halfPanel}>
              <TimePicker
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

export default AddBugBash;
