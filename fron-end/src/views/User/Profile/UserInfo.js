import React, { Component } from 'react';
import './profile_card.css';
import avatar from './m.jpg';

let username = "Ming";
let num_of_apps = 11;
let cell_phone = 12345678950;
let email = "aaaaaaaaMing@gmail.com";

class UserInfo extends Component {
  render() {
    return (
      <div className="profile-card">
        <p>
          <img src={avatar} alt="avatar"/>
        </p>
        <h3>{username}</h3>
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
