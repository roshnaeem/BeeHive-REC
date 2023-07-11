import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './LatestEventsFeed.css';
import dishwasher from '../../images/dishbg.png';
import laundry from '../../images/laundrybg.png';
import printer from '../../images/printbg.png';
import DayGrid from '../MonthlyCalendar/MonthlyCalendar';

class LatestEventsFeed extends Component {
  render() {

    return (

      <div>
         <h1 style={{color: '#21ba45', textAlign:'center'}}>Recommendations</h1>
         <h2>Hourly Predictions:</h2>

        <div class="ui link cards" style={{margin: "10px", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              
          <div class="card">
                <div class="image">
                  <img src={dishwasher} style={{width:'100%', height:'300px'}} alt="Dishwasher image"/>
                </div>
            <div class="content">
              <div class="header">Dishwasher</div>
              <div class="meta">
                <a>Tomorrow at 9:30 AM</a>
              </div>
              <div class="description">
              System predicts the less usage of energy from 09:30 to 14:30, Tomorrow.
              </div>
            </div>
            <div class="extra content">
              <span class="right floated">
                
              </span>
              <span>
                <i class="leaf icon"></i>
                Start the dishwasher. 
              </span>
            </div>
          </div>
          <div class="card">
            <div class="image" style={{width:'100%', height:'300px'}}>
              <img src={laundry}/>
            </div>
            <div class="content">
              <div class="header">Laundry</div>
              <div class="meta">
                <span class="date"> Tomorrow at 11:00 AM </span>
              </div>
              <div class="description">
                System predicts the less usage of energy from 09:30 to 14:30, Tomorrow.
              </div>
            </div>
            <div class="extra content">
              <span class="right floated">
             
              </span>
              <span>
                <i class="leaf icon" ></i>
                Use the washing machine and dryer.
              </span>
            </div>
          </div>
          <div class="card">
            <div class="image">
              <img src={printer} style={{width:'100%', height:'300px'}}/>
            </div>
            <div class="content">
              <div class="header">Printer</div>
              <div class="meta">
                <a>Tomorrow at 1:30 AM</a>
              </div>
              <div class="description">
              System predicts the less usage of energy from 09:30 to 14:30, Tomorrow.
              </div>
            </div>
            <div class="extra content">
              <span class="right floated">
                
              </span>
              <span>
                <i class="leaf icon"></i>
                Print the documents.
              </span>
            </div>
          </div>
        </div>
      
        <h2>Monthly Predictions:</h2>
        <h3>System predicts less energy usage on green days and more energy usage on red days.</h3>
        <DayGrid/>
      </div>

        
    );
  }
}

LatestEventsFeed.propTypes = {
  events: PropTypes.array.isRequired
};

export default LatestEventsFeed;
