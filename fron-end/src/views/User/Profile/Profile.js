import React, { Component } from 'react';
import { Row, Col, Button, Card } from 'reactstrap';
import ChangeProfile from './ChangeProfile';
import UserInfo from './UserInfo';

class Profile extends Component {
  constructor() {
    super();
    this.state = {change:false};
  }
  render() {
    if (this.state.change) {
      return (
        <Col xs="24" sm="12" lg="6">
        <Card>
          <ChangeProfile/>
          <Row>
            <Col>
            </Col>
            <Col>
            </Col>
            <Col>
              <Button block outline color="success" className="btn-pill">Confirm</Button>
            </Col>
            <Col>
              <Button block outline color="dark" className="btn-pill"
                      onClick={() => this.setState({change: false})}>Cancel</Button>
            </Col>
          </Row>
        </Card>
        </Col>
      );
    }
    return (
      <Col xs="24" sm="12" lg="6">
      <Card>
        <UserInfo/>
        <Row>
          <Col>
          </Col>
          <Col>
          </Col>
          <Col>
          </Col>
          <Col>
            <Button block outline color="primary" className="btn-pill"
                    onClick={() => this.setState({change: true})}>Modify</Button>
          </Col>
        </Row>
      </Card>
      </Col>
    );
  }
}

export default Profile;
