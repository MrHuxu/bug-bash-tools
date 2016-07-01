import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chip from 'material-ui/Chip';

const styles = {
  wrapper : {
    display  : 'flex',
    flexWrap : 'wrap'
  }
};

function handleRequestDelete () {
  alert('You clicked the delete button.');
}

function handleTouchTap () {
  alert('You clicked the Chip.');
}

class BugBashItem extends Component {
  render () {
    return (
      <Chip
        onRequestDelete = {handleRequestDelete}
        onTouchTap = {handleTouchTap}
      >
        {this.props.text}
      </Chip>
    );
  }
}

class BugBashList extends Component {
  render () {
    const { ids, infos } = this.props;
    const items = ids.toJS().map(id => {
      var info = infos.get(id.toString());
      return (
        <BugBashItem text = {info.get('name')} />
      );
    });

    return (
      <div style = {styles.wrapper}>
        {items}
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    ids   : state.bugBash.get('ids'),
    infos : state.bugBash.get('infos')
  };
};

export default connect(mapStateToProps)(BugBashList);
