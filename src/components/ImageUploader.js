/**
 * Created by epotignano on 16/03/16.
 */

import  React, {Component, PropTypes } from 'react'
import { UidRef, FireRef } from '../constants/Commons'
import  FileReaderInput from 'react-file-reader-input';
import Firebase from 'firebase';
import Rebase from 're-base'
const base = Rebase.createClass(FireRef)
import { connect } from 'react-redux';

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  UploadImage(file, collection, entityId, saveInKey ) {
    var _instance = new Firebase(FireRef + '/queue/tasks');
    // var file = new Uint8Array( imageBuffer );
    _instance.push({
      file, collection, entityId, saveInKey, jobType: 'uploadImage'
    })
  }

  handleChange(e, results, dispatch)  {
    const { collection, saveInKey, entityId} = this.props;
    results.forEach(result => {
      const [e, file] = result;
      if(e.target.result) {
        this.UploadImage(
          e.target.result,
          collection,
          entityId,
          saveInKey
        );
      }
    })
  }

  componentDidMount() {
    const { collection, saveInKey, entityId, keyToObserve} = this.props;
    let entityUrl = [collection, entityId, saveInKey, keyToObserve || null].join('/')
    base.listenTo(entityUrl, {
      context: this,
      asArray: false,
      then(imageUrl) {
        console.log(imageUrl);
        this.setState({
          image: imageUrl
        })
      }
    })
  }

  render() {
    const { dispatch } = this.props;
    return(
      <div className="ui shape">
        <div className="sides">
          <div className="active uploadSide side">
            <div className="ui card">
              <div className="image">
                <img className="ui large bordered image" src={ this.state.image || 'http://semantic-ui.com/images/wireframe/image.png' } alt="Image Preview"/>
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
          </div>
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

ImageUploader.propTypes = {
  collection: PropTypes.string,
  entityId: PropTypes.string,
  saveInKey: PropTypes.string,
  keyToObserve: PropTypes.string
}

export default connect(mapStateProps)(ImageUploader);
