import React, { Component } from 'react';
import { connect } from 'react-redux';
import echarts from 'echarts';

class PriorityChart extends Component {
  static propTypes = {
    style    : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
    names    : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    infos    : React.PropTypes.objectOf(React.PropTypes.shape({
      tickets : React.PropTypes.arrayOf(React.PropTypes.shape({
        assignee : React.PropTypes.string,
        link     : React.PropTypes.string.isRequired,
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
    const { names, infos } = this.props;
    var sum = {1: 0, 2: 0, 3: 0, 4: 0};
    names.forEach(name => {
      sum[1] += infos[name].score[1];
      sum[2] += infos[name].score[2];
      sum[3] += infos[name].score[3];
      sum[4] += infos[name].score[4];
    });
    var priorities = this.sortKeys(sum);
    var myChart = echarts.init(this.refs.chartContainer);
    var option =  {
      title : {
        text         : 'Priority',
        subtext      : `total: ${sum[1] + sum[2] + sum[3] + sum[4]}`,
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
        data   : priorities.map(i => {
          return {value: sum[i], name: `P${i} (${sum[i]})`};
        }),
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
    names : state.member.names,
    infos : state.member.infos
  };
};

export default connect(mapStateToProps)(PriorityChart);
