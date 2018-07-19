import React, { Component } from 'react';
import {CardColumns} from 'reactstrap';
import TotalPowerUse from './TotalPowerUse';
import AppsPowerUse from './AppsPowerUse';
import HighestPowerUse from './HighestPowerUse';

class PowerUse extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   height: 0
    // }
  }

  // componentDidMount(){
  //   let tpu = document.getElementById("tpu");
  //   let apu = document.getElementById("apu");
  //   let maxheight = Math.max(tpu.offsetHeight, apu.offsetHeight);
  //   tpu.style.height = maxheight + "px";
  //   apu.style.height = maxheight + "px";
  // }

  render() {

    return(
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          <TotalPowerUse/>
          <AppsPowerUse/>
        </CardColumns>
        <div>
          <HighestPowerUse/>
        </div>
      </div>
    );
  }
}

export default PowerUse;
