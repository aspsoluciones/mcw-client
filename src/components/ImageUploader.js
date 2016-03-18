/**
 * Created by epotignano on 16/03/16.
 */

import  React, {Component, PropTypes } from 'react'
import { UidRef } from '../constants/Commons'
import  FileReaderInput from 'react-file-reader-input';
import {
  UploadImage,
  UploadImageProgress,
  imageReadProgress,
  imageReadSuccess
}  from '../actions/ImageUploadActions';


import { connect } from 'react-redux';

class ImageUploader extends Component {

  handleChange(e, results, dispatch)  {
    results.forEach(result => {
      const [e, file] = result;
      let _percentage = (result[0].loaded * 100) / result[0].total;
      dispatch(imageReadProgress(_percentage));
      if(e.target.result) {
        dispatch(UploadImage(e.target.result, 'users', 'd3aecdc9-2ded-4689-93fa-2a6a95c74b06', 'avatar'));
      }
    })
  }
  upload() {

  }

  render() {
    const { dispatch, imageUpload } = this.props;

    return(
      <div className="ui card">
        <div className="image">
          <img className="ui large bordered image" src={ imageUpload.fileUrl || 'http://semantic-ui.com/images/wireframe/image.png' } alt="Image Preview"/>
        </div>
        <div className="extra content">
          <FileReaderInput as="binary" id="myFileInput" onChange={(e, results) => this.handleChange(e, results, dispatch)}>
            <button className="ui blue button round">
              Upload
            </button>
          </FileReaderInput>
        </div>
        <div className="ui bottom attached progress">
          <div className="bar"></div>
        </div>
      </div>
    )
  }
}

function mapStateProps(state){
  const { imageUpload } = state;

  return {
    imageUpload
  }
}

export default connect(mapStateProps)(ImageUploader);
