import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './LatestEventsFeed.css';
import dishwasher from '../../images/dishbg.png';
import laundry from '../../images/laundrybg.png';
import printer from '../../images/printbg.png';

class LatestEventsFeed extends Component {
  render() {

    return (

      <div>
         <h1 style={{color: '#21ba45', textAlign:'center'}}>Recommendations</h1>

        <div class="ui link cards" style={{margin: "30px", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              
          <div class="card">
                <div class="image">
                  <img src={dishwasher} style={{width:'100%', height:'300px'}} alt="Dishwasher image"/>
                </div>
            <div class="content">
              <div class="header">Dishwasher</div>
              <div class="meta">
                <a>Today at 6:12pm</a>
              </div>
              <div class="description">
                Start the dishwasher.
              </div>
            </div>
            <div class="extra content">
              <span class="right floated">
                
              </span>
              <span>
                <i class="leaf icon"></i>
                Upto 125 Watts
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
                <span class="date">Tuesday at 1:21pm</span>
              </div>
              <div class="description">
            Use the washing machine and dryer.
              </div>
            </div>
            <div class="extra content">
              <span class="right floated">
              </span>
              <span>
                <i class="leaf icon"></i>
                Upto 90 Watts
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
                <a>Tomorrow at 8:39am</a>
              </div>
              <div class="description">
              Print the documents.
              </div>
            </div>
            <div class="extra content">
              <span class="right floated">
                
              </span>
              <span>
                <i class="leaf icon"></i>
                Upto 75 Watts
              </span>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

LatestEventsFeed.propTypes = {
  events: PropTypes.array.isRequired
};

export default LatestEventsFeed;
