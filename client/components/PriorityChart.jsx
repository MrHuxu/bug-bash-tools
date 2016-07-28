import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomPieChart from './CustomPieChart';

class PriorityChart extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
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

  sortKeys = (data) => {
    var keys = Object.keys(data);
    return keys.sort((key1, key2) => data[key1] > data[key2] ? -1 : 1);
  };

  getData = () => {
    const { infos } = this.props;
    var sum = {1: 0, 2: 0, 3: 0, 4: 0};
    for (let name in infos) {
      sum[1] += infos[name].Score.P1;
      sum[2] += infos[name].Score.P2;
      sum[3] += infos[name].Score.P3;
      sum[4] += infos[name].Score.P4;
    }
    var priorities = this.sortKeys(sum);

    return {
      subTitle : `total: ${sum[1] + sum[2] + sum[3] + sum[4]}`,
      data     : priorities.map(i => {
        return {value: sum[i], name: `P${i} (${sum[i]})`};
      })
    };
  };

  render () {
    return (
      <CustomPieChart
        style = {this.props.style}
        title = 'Priority'
        subTitle = {this.getData().subTitle}
        data = {this.getData().data}
      />
    );
  }
}

var mapStateToProps = (state) => {
  return {
    infos : state.member.infos
  };
};

export default connect(mapStateToProps)(PriorityChart);
