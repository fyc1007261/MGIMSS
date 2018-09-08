import React, { Component } from 'react';
import { Col, Card } from 'reactstrap';
import ChangeProfile from './ChangeProfile';
import UserInfo from './UserInfo';


require('../../../css/profile.css');

class Profile extends Component {
  constructor() {
    super();
    this.state = {change:0};
  }

  ChangeProfile = () => {
    this.setState({change : 1});
  };

  CancelChange = () => {
    this.setState({change : 0});
  };

  render() {
    if (this.state.change === 1) {
      return (
        <Col xs={{size:12}} sm={{size:12}} lg={{size:6, offset:3}} className="profile">
          <Card>
            <ChangeProfile SetChangeState={this.CancelChange}/>
          </Card>
        </Col>
      );
    }
    return (
      <Col xs={{size:12}} sm={{size:12}} lg={{size:6, offset:3}}  className="profile">
        <Card>
          <UserInfo SetChangeState={this.ChangeProfile}/>
        </Card>
      </Col>
    );
  }
}

export default Profile;
