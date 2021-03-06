import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import '../../../css/profile_card.css';
import $ from "jquery";

require('../../../css/profile.css');

class UserInfo extends Component {

  constructor(pops){
    super(pops);
    this.logout = this.logout.bind(this);
  }

  logout(){
    $.ajax({
      url:"/logout",
      async:false,
      type:"get",
      success:function (data) {
      }
    });
  }

  render() {
    // let username = "Ming";
    // let num_of_apps = 11;
    // let cell_phone = "12345678950";
    // let email = "aaaaaaaaMing@gmail.com";

    // let avatarURL = "https://res.cloudinary.com/breezeeee/image/upload/v1532584389/mgimss/ymy0ccl6vxpuqtiuv2sv.png";


    let username = "";
    let num_of_apps = 0;
    let cell_phone = "";
    let email = "";

    let avatarURL = "";


    $.ajax({
      url:"/user/get_user_info",
      context:document.body,
      async:false,
      type:"get",
      success:function (data) {
        let tmpInfo = $.parseJSON(data);
        username = tmpInfo["username"];
        cell_phone = tmpInfo["phone"];
        email = tmpInfo["email"];
        num_of_apps = tmpInfo["num"];

        avatarURL = tmpInfo["avatarURL"];

      }
    });
    return (
      <div className="profile-card">
        <p>
          <img src={avatarURL} alt="avatar"/>
        </p>
        <h3>{username}</h3>
        <Row>
          <Col xs={{size:12}} sm={{size:3}} className="user-button">
            <Button block outline color="danger" className="btn-pill"
                    onClick={this.logout}>Logout</Button>
          </Col>
          <Col xs={{size:12}} sm={{size:3 , offset: 6}}  className="user-button">
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
