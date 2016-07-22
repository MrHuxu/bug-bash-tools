import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomPieChart from './CustomPieChart';

class HistoricalChart extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      tickets : React.PropTypes.arrayOf(React.PropTypes.shape({
        assignee : React.PropTypes.string,
        link     : React.PropTypes.string.isRequired,
        module   : React.PropTypes.string.isRequired,
        priority : React.PropTypes.string.isRequired,
        status   : React.PropTypes.string.isRequired,
        summary  : React.PropTypes.string.isRequired,
        ticket   : React.PropTypes.string.isRequired,
        labels   : React.PropTypes.arrayOf(React.PropTypes.string).isRequired
      })).isRequired,
      score : React.PropTypes.shape({
        1   : React.PropTypes.number.isRequired,
        2   : React.PropTypes.number.isRequired,
        3   : React.PropTypes.number.isRequired,
        4   : React.PropTypes.number.isRequired,
        sum : React.PropTypes.number.isRequired
      }).isRequired
    })).isRequired
  };

  sortKeys = (data) => {
    var keys = Object.keys(data);
    return keys.sort((key1, key2) => data[key1] > data[key2] ? -1 : 1);
  };

  getData = () => {
    const { infos } = this.props;
    var sum = 0;
    var historical = {};
    for (var name in infos) {
      var info = infos[name];
      info.tickets.forEach(ticket => {
        if (ticket.labels && ticket.labels.indexOf('historical-debts') !== -1) {
          historical[ticket.module] = historical[ticket.module] ? historical[ticket.module] + 1 : 1;
          ++sum;
        }
      });
    }
    var modules = this.sortKeys(historical);

    return {
      subTitle : `total: ${sum}`,
      data     : modules.length ? modules.map(key => {
        return { value: historical[key], name: `${key} (${historical[key]})` };
      }) : [{ value: 0, name: 'None' }]
    };
  };

  render () {
    return (
      <CustomPieChart
        style = {this.props.style}
        title = 'Historical'
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

export default connect(mapStateToProps)(HistoricalChart);
