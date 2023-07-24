import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Line} from 'react-chartjs-2';
import palette from '../../lib/color';
import './PowerOutputChart.css';

class PowerOutputChart extends Component {
  constructor(props) {
    super(props);

    const xAxisLabel = 'Time';

    const yAxisLabel = 'kW';

    this.initialPointRadius = 2;

    this.powerLineLabel = 'Current Energy';

    this.powerLineBackgroundColor = palette.lightGreen.setAlpha(0.1).toString();

    this.powerLineBorderColor = palette.lightGreen.toString();

    this.timeLabels = ['0', '', '', '', '', 'Now'];

    this.options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: xAxisLabel
          },
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: yAxisLabel
          },
          ticks: {
            beginAtZero: true,
            suggestedMax: 0.5,
            stepSize: 50,
          }
        }]
      },
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 5,
      },
      tooltips: {
        callbacks: {
          title: (tooltipItem, data) => {
            const datasetIndex = tooltipItem[0].datasetIndex;
            return data.datasets[datasetIndex].label;
          },
          label: (tooltipItem, data) => {
            const powerValue = tooltipItem.yLabel;
            return powerValue.toFixed(2) + ' kW';
          }
        }
      }
    };

    this.legend = {
      display: false
    };

    const initialTotalOutputPowerHistory = [null, null, null, null, null, null].map(() => {
      return PowerOutputChart.getInitialTotalOutputPower(this.props.panels);
    });

    this.state = {
      totalOutputPowerHistory: initialTotalOutputPowerHistory,
      pointRadius: this.initialPointRadius
    };

    setInterval(this.updateTotalOutputPowerHistory.bind(this), 5000);
    setInterval(this.getTotalOutputPower.bind(this), 5000);

  }


  updateTotalOutputPowerHistory() {
    this.setState( (prevState, props) => {
      const totalOutputPowerHistory = prevState.totalOutputPowerHistory.concat();
      const totalOutputPower = prevState.currentEnergy;
      totalOutputPowerHistory.shift();
      totalOutputPowerHistory.push(totalOutputPower);
      return {
        totalOutputPowerHistory: totalOutputPowerHistory
      };
    });
  }

  static getInitialTotalOutputPower(panels) {
    return panels.reduce((accumulator, panel) => {
      return 0;
    }, 0);
  }

  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({'communityId': 1, 'houseId': 1}),
    }
    let returnValue;

    fetch("http://localhost:8080/api/v1/inventory/current", requestOptions)
    .then(response => response.json())
    .then(data => {
      this.setState({ currentEnergy: data[0].energyProduced })
    })
    return returnValue;
  }

 
  getTotalOutputPower() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({'communityId': 1, 'houseId': 1}),
    }
    let returnValue;

    fetch("http://localhost:8080/api/v1/inventory/current", requestOptions)
    .then(response => response.json())
    .then(data => {
      this.setState({ currentEnergy: data[0].energyProduced })
    })
    return returnValue;
  }

  render() {
    const data = {
      labels: this.timeLabels,
      datasets: [{
        label: this.powerLineLabel,
        data: this.state.totalOutputPowerHistory,
        backgroundColor: this.powerLineBackgroundColor,
        borderColor: this.powerLineBorderColor,
        borderWidth: 1,
        pointBackgroundColor: this.powerLineBorderColor,
        pointRadius: this.state.pointRadius,
        pointHoverRadius: this.state.pointRadius
      }]
    };

    return (
      <div className='power-output-chart--chart-wrapper'>
        <Line data={data} options={this.options} legend={this.legend}/>
      </div>
    );
  }
}

PowerOutputChart.propTypes = {
  panels: PropTypes.array.isRequired,
};

export default PowerOutputChart;