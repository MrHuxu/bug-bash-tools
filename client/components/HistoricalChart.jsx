import React, { Component } from 'react';
import { connect } from 'react-redux';
import echarts from 'echarts';

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

  componentDidUpdate () {
    this.rerenderChart();
  }

  sortKeys = (data) => {
    var keys = Object.keys(data);
    return keys.sort((key1, key2) => data[key1] > data[key2] ? -1 : 1);
  };

  rerenderChart = () => {
    const { infos } = this.props;
    var sum = 0;
    var historical = {};
    for (var name in infos) {
      var info = infos[name];
      info.tickets.forEach(ticket => {
        if (ticket.labels && ticket.labels.includes('historical-debts')) {
          historical[ticket.module] = historical[ticket.module] ? historical[ticket.module] + 1 : 1;
          ++sum;
        }
      });
    }
    var modules = this.sortKeys(historical);
    var myChart = echarts.init(this.refs.chartContainer);
    var option =  {
      title : {
        text         : 'Historical',
        subtext      : `total: ${sum}`,
        x            : 'center',
        subtextStyle : {
          color : '#888'
        }
      },
      tooltip : {
        trigger   : 'item',
        formatter : '{b} : {c} ({d}%)'
      },
      series : [{
        type   : 'pie',
        radius : '55%',
        center : ['50%', '60%'],
        data   : modules.length ? modules.map(key => {
          return { value: historical[key], name: `${key} (${historical[key]})` };
        }) : [{ value: 0, name: 'None' }],
        itemStyle : {
          emphasis : {
            shadowBlur    : 10,
            shadowOffsetX : 0,
            shadowColor   : 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    myChart.setOption(option);
  };

  render () {
    return (
      <div
        ref = 'chartContainer'
        style = {this.props.style}>
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    infos : state.member.infos
  };
};

export default connect(mapStateToProps)(HistoricalChart);
