import React, { Component } from 'react';
import {CardColumns} from 'reactstrap';
import AppDynamicChart from './AppDynamicChart';

const aid = 0;
const count = 10;

class DynamicChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      aid: aid,
      count: count
    };

  }
  render() {
    return(
      <div>
          <AppDynamicChart aid={this.state.aid} count={this.state.count}/>
      </div>
    );
  }
}

export default DynamicChart;
