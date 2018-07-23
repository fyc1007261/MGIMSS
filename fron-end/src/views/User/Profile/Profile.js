import React, { Component } from 'react';
import { Col, Card } from 'reactstrap';
import ChangeProfile from './ChangeProfile';
import UserInfo from './UserInfo';

class Profile extends Component {
  constructor() {
    super();
    this.state = {change:false};
  }

  ChangeProfile = () => {
    this.setState({change : true});
  };

  CancelChange = () => {
    this.setState({change : false});
  };

  render() {
    if (this.state.change) {
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
