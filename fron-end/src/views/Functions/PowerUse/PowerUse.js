import React, { Component } from 'react';
import {Col, Row} from 'reactstrap';
import TotalPowerUse from './TotalPowerUse';
import AppsPowerUse from './AppsPowerUse';
import HighestPowerUse from './HighestPowerUse';

require('../../../css/all.css');

class PowerUse extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="animated fadeIn">
        <div>
          <HighestPowerUse/>
        </div>
        <Row>
          <Col xs="24" sm="12" lg="6">
            <TotalPowerUse/>
          </Col>
          <Col xs="24" sm="12" lg="6">
            <AppsPowerUse/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PowerUse;
