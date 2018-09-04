import React, { Component } from 'react';
import '../../../css/profile_card.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import AvatarEditor from 'react-avatar-editor';
import { Redirect } from 'react-router-dom';
import { Col, Card, Button, Row } from 'reactstrap';
import $ from 'jquery';

const CLOUDINARY_UPLOAD_PRESET = 'Avatar';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/breezeeee/upload';

class ContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: '',
      uploadedFile: null,
      showEdit: false
    };
  }

  onImageDrop = (files) => {
    this.setState({
      uploadedFile: files[0],
      showEdit: true
    });
  };

  onClickSave = () => {
    if (this.editor) {
      // const canvas = this.editor.getImage();
      const canvasScaled = this.editor.getImageScaledToCanvas();
      let file = canvasScaled.toDataURL("image/png");
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', file);
      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
        if (response.body.secure_url !== '') {
          let new_URL = response.body.secure_url;
          $.ajax({
            url:"/user/change_avatar",
            data:{
              new_avatarURL:new_URL
            },
            context:document.body,
            async:false,
            type:"get",
          });
          this.setState({
            uploadedFileCloudinaryUrl: new_URL
          });
        }
      });
    }
  };

  setEditorRef = (editor) => this.editor = editor;

  render() {
    if(this.state.uploadedFileCloudinaryUrl !== "") {
      alert("success");
      return(
        <Redirect push to="/main/user/profile"/>
      );
    }
    if (this.state.showEdit) {
      return (
        <div className="profile-card">
          <Row>
            <Col></Col>
            <Col>
              <AvatarEditor
                ref={this.setEditorRef}
                image={this.state.uploadedFile}
                width={200}
                height={200}
                border={50}
                color={[248, 249, 250, 0.8]}
                scale={1}
                style={{cursor: 'move', margin: '10px 0'}}
                className="avatarEdit"
              />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col><Col></Col>
            <Col>
              <Button block outline color="success" className="btn-pill" onClick={this.onClickSave}>Confirm</Button>
            </Col>
            <Col>
              <Button block outline color="dark" className="btn-pill"
                      onClick={() => this.setState({showEdit: false, uploadedFile: null})}>Cancel</Button>
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <Row className="profile-card">
        <Col></Col>
        <Col className="FileUpload">
          <Dropzone
            multiple={false}
            accept="image/jpeg,image/png"
            onDrop={this.onImageDrop}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </Col>
        <Col></Col>
      </Row>

    );
  }
}

class Avatar extends Component {

  render() {
    return(
      <Col xs="24" sm="12" lg="6">
        <Card>
          <ContactForm/>
        </Card>
      </Col>
    );
  }
}

export default Avatar;
