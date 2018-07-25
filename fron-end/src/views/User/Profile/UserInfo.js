import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import '../../../css/profile_card.css';
import avatar from './m.jpg';
import $ from "jquery";

class UserInfo extends Component {
  render() {
    let username = "Ming";
    let num_of_apps = 11;
    let cell_phone = "12345678950";
    let email = "aaaaaaaaMing@gmail.com";

    // let username = "";
    // let num_of_apps = 0;
    // let cell_phone = "";
    // let email = "";
    //
    // $.ajax({
    //   url:"/user/get_user_info",
    //   context:document.body,
    //   async:false,
    //   type:"get",
    //   success:function (data) {
    //     let tmpInfo = $.parseJSON(data);
    //     username = tmpInfo["username"];
    //     cell_phone = tmpInfo["phone"];
    //     email = tmpInfo["email"];
    //     num_of_apps = tmpInfo["num"];
    //   }
    // });
    return (
      <div className="profile-card">
        <p>
          <img src={avatar} alt="avatar"/>
        </p>
        <h3>{username}</h3>
        <Row>
          <Col>
          </Col>
          <Col>
          </Col>
          <Col>
          </Col>
          <Col>
            <Button block outline color="primary" className="btn-pill"
                    onClick={this.props.SetChangeState}>Modify</Button>
          </Col>
        </Row>
        <ul>
          <li>Cell Phone <span>{cell_phone}</span></li>
          <li>Email <span>{email}</span></li>
          <li>Number of Appliances <span>{num_of_apps}</span></li>
        </ul>
      </div>
    );
  }
}

export default UserInfo;
