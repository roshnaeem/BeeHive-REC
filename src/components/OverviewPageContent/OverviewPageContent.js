import React, {Component} from 'react';
import { Container, Icon, Header, Segment} from 'semantic-ui-react';
import SolarRadianceChartContainer from "../../containers/SolarRadianceChartContainer";
import PowerOutputChartContainer from "../../containers/PowerOutputChartContainer";
import EnergyStorageChartContainer from "../../containers/EnergyStorageChartContainer";
import Button from '../Button/Button';
import './OverviewPageContent.css';

class OverviewPageContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeButtonIndex: null
    };
  }


  handleButtonClick = (index) => {
    this.setState({ activeButtonIndex: index });
  };

  render() {

    const { activeButtonIndex } = this.state;

    return (
      <Container>
        <Header as='h1' content='Overview:' subheader='Energy data report for HouseID=1 and CommunityID=1'/>

        {/* button space */}
      
          <div className="button-container">
          {/* <Grid.Column width={16}> */}
            <Button
              buttonText="Current Energy"
              iconName = "dashboard"
              onClick={this.handleButtonClick}
              index={0}
              active={activeButtonIndex === 0}
            ></Button>
            <Button
              buttonText="Energy Production"
              iconName = "leaf"
              onClick={this.handleButtonClick}
              index={1}
              active={activeButtonIndex === 1}
            />
            <Button
              buttonText="Energy Consumption"
              iconName = "bolt"
              onClick={this.handleButtonClick}
              index={2}
              active={activeButtonIndex === 2}
            />
            </div>
            {activeButtonIndex === 0 && <PowerOutputChartContainer />}
            {activeButtonIndex === 1 && <SolarRadianceChartContainer />}
            {activeButtonIndex === 2 && <EnergyStorageChartContainer />}

      </Container>
    );
  }
}

export default OverviewPageContent;
