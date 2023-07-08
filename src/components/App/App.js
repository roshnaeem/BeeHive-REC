import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Sidebar} from 'semantic-ui-react';
import VerticalNavBarContainer from '../../containers/VerticalNavBarContainer';
import OverviewPageContent from '../OverviewPageContent/OverviewPageContent';
import PanelStatusTableContainer from '../../containers/PanelStatusTableContainer';
import InvoiceContainer from '../../containers/InvoiceContainer';
import {getNearbyRandomNumber} from '../../lib/random';
import HorizontalNavBar from '../HorizontalNavBar/HorizontalNavBar';
import LatestEventsFeedContainer from '../../containers/LatestEventsFeedContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    setInterval(this.updateInputRadiances.bind(this), 4000);
    setInterval(this.updateStoredEnergies.bind(this), 4000);

    this.state = {
      activeComponent: 'dashboard' // Set the initial active component here
    };

    console.log("app.js, activeComponent ", this.state);
  }

  updateInputRadiances() {
    const newInputRadiancesByPanelId = [];
    this.props.panels.forEach((panel) => {
      newInputRadiancesByPanelId[panel.id] = getNearbyRandomNumber(0, 1, panel.inputRadianceKWM2, 0.05);
    });
    this.props.updateInputRadiances(newInputRadiancesByPanelId);
  }


  updateStoredEnergies() {
    const newStoredEnergiesByBatteryId = [];
    this.props.batteries.forEach((battery) => {
      newStoredEnergiesByBatteryId[battery.id] = getNearbyRandomNumber(0, battery.energyCapacityKWh, battery.storedEnergyKWh, 0.25);
    });
    this.props.updateStoredEnergies(newStoredEnergiesByBatteryId);
  }

  hideSidebarIfVisible() {
    if (this.props.sidebarVisible === true) {
      this.props.toggleSidebarVisibility();
    }
  }

  handleActiveComponentChange = (component) => {
    console.log('Active Component:', component);
    this.setState({ activeComponent: component });
  };

  renderActiveComponent = () => {
    const { activeComponent } = this.state;

    if (activeComponent === 'dashboard' || activeComponent === 'beehive') {
      return <OverviewPageContent/>;
    } else if (activeComponent === 'credits') {
      return  <PanelStatusTableContainer/>;
    }
    else if (activeComponent === 'invoice') {
      return  <InvoiceContainer/>;
    }
    else if(activeComponent === 'recommendations') {
      return <LatestEventsFeedContainer/>;
    }

    return null;
  };

  render() {
    return (
      <Sidebar.Pushable>
        <VerticalNavBarContainer toggleSidebarVisibility={this.props.toggleSidebarVisibility}/>
        <Sidebar.Pusher onClick={this.hideSidebarIfVisible.bind(this)} dimmed={this.props.sidebarVisible}>
        <HorizontalNavBar
            toggleSidebar={this.props.toggleSidebarVisibility}
            onActiveComponentChange={this.handleActiveComponentChange}
          />
          {this.renderActiveComponent()}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

App.propTypes = {
  batteries: PropTypes.array.isRequired,
  panels: PropTypes.array.isRequired,
  sidebarVisible: PropTypes.bool.isRequired,
  toggleSidebarVisibility: PropTypes.func.isRequired,
  updateInputRadiances: PropTypes.func.isRequired,
  updateStoredEnergies: PropTypes.func.isRequired
};

export default App;
