import React, { Component } from 'react';
import {CardColumns} from 'reactstrap';
import TotalPowerUse from './TotalPowerUse';
import AppsPowerUse from './AppsPowerUse';

class PowerUse extends Component {
  render() {
    return(
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          <TotalPowerUse/>
          <AppsPowerUse/>
        </CardColumns>
      </div>
    );
  }
}

export default PowerUse;
