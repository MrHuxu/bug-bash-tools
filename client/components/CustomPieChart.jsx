import React, { Component } from 'react';
import echarts from 'echarts';

class CustomPieChart extends Component {
  static propTypes = {
    style    : React.PropTypes.object.isRequired,
    title    : React.PropTypes.string.isRequired,
    subTitle : React.PropTypes.string.isRequired,
    data     : React.PropTypes.arrayOf(React.PropTypes.shape({
      name  : React.PropTypes.string.isRequired,
      value : React.PropTypes.number.isRequired
    })).isRequired
  };

  componentDidUpdate () {
    this.rerenderChart();
  }

  rerenderChart = () => {
    const { title, subTitle, data } = this.props;
    var myChart = echarts.init(this.refs.chartContainer);
    var option =  {
      title : {
        text         : title,
        subtext      : subTitle,
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
        type      : 'pie',
        radius    : '55%',
        center    : ['50%', '60%'],
        data      : data,
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

export default CustomPieChart;
