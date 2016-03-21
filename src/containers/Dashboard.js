/**
 * Created by epotignano on 25/02/16.
 */
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageUploader from '../components/ImageUploader';

class Dashboard extends React.Component {
  render(){
    return(
      <div className="row">
        <div className="column">
          <ImageUploader
            collection="users"
            entityId="1"
            saveInKey="avatar"
            keyToObserve="url"
          />
        </div>
      </div>
    );
  }
}

module.exports = Dashboard;
