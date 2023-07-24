import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import PropTypes from 'prop-types';
import palette from '../../lib/color';
import './EnergyStorageChart.css';

class EnergyStorageChart extends Component {

  constructor(props) {
    super(props);

    const xAxisLabel = 'Time';

    const yAxisLabel = 'kW';

    this.seriesLabel = 'Energy';

    this.powerLineBackgroundColor = palette.lightGreen.setAlpha(0.1).toString();

    this.powerLineBorderColor = palette.lightGreen.toString();
    this.timeLabels = ['-5h', '-4h', '-3h', '-2h', '-1h', 'Now'];

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

    const initialTotalOutputPowerHistory = [null, null, null, null, null, null];

    this.state = {
      totalOutputPowerHistory: initialTotalOutputPowerHistory,
      pointRadius: this.initialPointRadius,
    };

    setInterval(this.updateTotalOutputPowerHistory.bind(this), 5000);
    setInterval(this.getTotalOutputPower.bind(this), 5000);
  }

  componentDidMount() {
    let energyobj;
    fetch("http://localhost:8082/api/v1/consumptions/1/1?numberOfTransactions=6")
    .then(response => response.json())
    .then(data => {
      energyobj = data;
      console.log("energy object given here", energyobj)
    })
    .then(() => {
      this.setState({energyProduction0: energyobj[0].units})
      this.setState({energyProduction1: energyobj[1].units})
      this.setState({energyProduction2: energyobj[2].units})
      this.setState({energyProduction3: energyobj[3].units})
      this.setState({energyProduction4: energyobj[4].units})
      this.setState({energyProduction5: energyobj[5].units})
     });
    return energyobj;
  }

  getTotalOutputPower() {
    let energyobj;
    fetch("http://localhost:8082/api/v1/consumptions/1/1?numberOfTransactions=6")
    .then(response => response.json())
    .then(data => {
      energyobj = data;
      console.log("energy object given here", energyobj)
    })
    .then(() => {
      this.setState({energyProduction0: energyobj[5].units})
      this.setState({energyProduction1: energyobj[4].units})
      this.setState({energyProduction2: energyobj[3].units})
      this.setState({energyProduction3: energyobj[2].units})
      this.setState({energyProduction4: energyobj[1].units})
      this.setState({energyProduction5: energyobj[0].units})
     });
    return energyobj;
  }

  updateTotalOutputPowerHistory() {
    this.setState( (prevState, props) => {
      var energyProducedArray = [prevState.energyProduction0, prevState.energyProduction1, prevState.energyProduction2, prevState.energyProduction3, prevState.energyProduction4, prevState.energyProduction5];
      return {
        totalOutputPowerHistory: energyProducedArray
      };
    });
  }

  render() {
    const data = {
      labels: this.timeLabels,
      datasets: [{
        label: this.seriesLabel,
        data: this.state.totalOutputPowerHistory,
        backgroundColor: this.powerLineBackgroundColor,
        borderColor: this.powerLineBorderColor,
        borderWidth: 1,
        pointBackgroundColor: this.powerLineBorderColor,
        pointRadius: this.state.pointRadius,
        pointHoverRadius: this.state.pointRadius
      }]
    };

    const panels = this.props.panels,
      panelIds = [],
      inputRadiances = [],
      barColors = [];

    return (
      <div className='solar-radiance-chart--chart-wrapper'>
       <Line data={data} options={this.options} legend={this.legend}/>
      </div>
    );
  }
}

EnergyStorageChart.propTypes = {
  batteries: PropTypes.array.isRequired
};

export default EnergyStorageChart;