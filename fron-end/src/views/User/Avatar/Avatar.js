import React, { Component } from 'react';
import '../../../css/profile_card.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Col, Card } from 'reactstrap';

const CLOUDINARY_UPLOAD_PRESET = 'mgimss';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/breezeeee/upload';

class ContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: ''
    };
  }

  onImageDrop = (files) => {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  };

  handleImageUpload = (file) => {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  };

  render() {
    return (
      <div className="profile-card">
        <div className="FileUpload">
          <Dropzone
            multiple={false}
            accept="image/jpeg,image/png"
            onDrop={this.onImageDrop}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>
        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
              <p>{this.state.uploadedFile.name}</p>
              <img src={this.state.uploadedFileCloudinaryUrl} />
            </div>
          }
        </div>
      </div>

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
