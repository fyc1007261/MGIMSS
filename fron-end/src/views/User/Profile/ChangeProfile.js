import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import $ from 'jquery';

// let username = "Ming";
// let cell_phone = 12345678950;
// let email = "aaaaaaaaMing@gmail.com";

// let avatarURL = "https://res.cloudinary.com/breezeeee/image/upload/v1532584389/mgimss/ymy0ccl6vxpuqtiuv2sv.png";


let username = "";
let cell_phone = "";
let email = "";

let avatarURL = "";


class InputEmail extends Component {
  constructor() {
    super();
    this.state = {success: 1};
  }

  handleChange = (e) => {
    const email = e.target.value;
    this.props.onEmailChange(email);
    let re2 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!re2.test(email)) {
      this.setState({success: 0});
      this.props.SetErr(1);
    }
    else {
      this.setState({success:1});
      this.props.SetErr(0);
    }
  };

  render() {
    if(this.state.success === 0) {
      return (
        <form>
          <div>
            <input type="text" className="form-control is-invalid" placeholder="Email" value={this.props.value} onChange={this.handleChange} required/>
            <div className="invalid-feedback">
              Invalid email format
            </div>
          </div>
        </form>
      );
    }
    return (
      <form>
        <div>
          <input type="text" className="form-control is-valid" placeholder="Email" value={this.props.value} onChange={this.handleChange} required/>
          <div className="valid-feedback">
            Looks good
          </div>
        </div>
      </form>
    );
  }
}

class InputPhonenumber extends Component {
  constructor() {
    super();
    this.state = {success: 1};
  }

  handleChange = (e) => {
    const phonenumber = e.target.value;
    this.props.onPhonenumberChange(phonenumber);
    let re3=/^(1+\d{10})$/;
    if(!re3.test(phonenumber)) {
      this.setState({success: 0});
      this.props.SetErr(1);
    }
    else {
      this.setState({success:1});
      this.props.SetErr(0);
    }
  };

  render() {
    if(this.state.success === 0) {
      return (
        <form>
          <div>
            <input type="text" className="form-control is-invalid" placeholder="Phonenumber" value={this.props.value} onChange={this.handleChange} required/>
            <div className="invalid-feedback">
              Invalid phonenumber format
            </div>
          </div>
        </form>
      );
    }
    return (
      <form>
        <div>
          <input type="text" className="form-control is-valid" placeholder="Phonenumber" value={this.props.value} onChange={this.handleChange} required/>
          <div className="valid-feedback">
            Looks good
          </div>
        </div>
      </form>
    );
  }
}

class UpdateProfile extends Component {
  constructor() {
    super();
    this.state = {cell_phone:cell_phone, email:email, err1:0, err2:0};
  }

  setEmail = (email) => {
    this.setState({email : email});
  };
  setPhonenumber = (phonenumber) => {
    this.setState({cell_phone : phonenumber});
  };

  SetErr1 = (err1) => {
    this.setState({err1:err1});
  };
  SetErr2 = (err2) => {
    this.setState({err2:err2});
  };

  ChangeProfile = () => {
    if(this.state.err1 || this.state.err2) {
      alert("Please check your information");
    }
    else {
      $.ajax({
        url:"/user/update_user_info",
        data:{
          new_email:this.state.email,
          new_phone:this.state.cell_phone,
        },
        context:document.body,
        async:false,
        type:"get",
        success:function (data) {
          alert("success");
        }
      });
      this.props.SetChangeState();
    }
  };

  render() {
    return(
      <div className="profile-card profile">
        <p>
          <img src={avatarURL} alt="avatar"/>
        </p>
        <FormGroup row>
          <Col md="3">
            <Label>Username</Label>
          </Col>
          <Col xs="12" md="9">
            <p className="form-control-static">{username}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label>Cell Phone</Label>
          </Col>
          <Col xs="12" md="9">
            <InputPhonenumber onPhonenumberChange={this.setPhonenumber} value={this.state.cell_phone} SetErr={this.SetErr1}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label>Email</Label>
          </Col>
          <Col xs="12" md="9">
            <InputEmail onEmailChange={this.setEmail} value={this.state.email} SetErr={this.SetErr2}/>
          </Col>
        </FormGroup>
        <Row>
          <Col></Col><Col></Col>
          <Col>
            <Button block outline color="success" className="btn-pill" onClick={this.ChangeProfile}>Confirm</Button>
          </Col>
          <Col>
            <Button block outline color="dark" className="btn-pill"
                    onClick={this.props.SetChangeState}>Cancel</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

class ChangeProfile extends Component {
  render() {
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

        avatarURL = tmpInfo["avatarURL"];

      }
    });
    return(
      <UpdateProfile SetChangeState={this.props.SetChangeState}/>
    );
  }
}

export default ChangeProfile;
