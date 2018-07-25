import React, { Component } from 'react';
import { Col, Card } from 'reactstrap';
import ChangeProfile from './ChangeProfile';
import UserInfo from './UserInfo';

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
        <Col xs="24" sm="12" lg="6">
          <Card>
            <ChangeProfile SetChangeState={this.CancelChange}/>
          </Card>
        </Col>
      );
    }
    return (
      <Col xs="24" sm="12" lg="6">
        <Card>
          <UserInfo SetChangeState={this.ChangeProfile}/>
        </Card>
      </Col>
    );
  }
}

export default Profile;
