/**
 * Created by epotignano on 16/03/16.
 */

import Firebase from 'firebase';
import { FireRef, UidRef } from '../constants/Commons';

import {
  IMAGE_READ_PROGRESS, IMAGE_READ_SUCCESS
} from '../constants/ActionTypes';

function UploadImageSuccess() {

}

function UploadImageFailure() {

}

export function imageReadSuccess(fileUrl) {

  return {
    type: IMAGE_READ_SUCCESS,
    fileUrl
  }

}

export function imageReadProgress(progress) {
  return {
    type: IMAGE_READ_PROGRESS,
    progress
  }
}

export function UploadImageProgress(progress) {
  return {

  }
}

export function UploadImage(file, collection, entityId, saveInKey ) {
  var _instance = new Firebase(FireRef + '/jobs');
  _instance.push({
    file, collection, entityId, saveInKey, jobType: 'IMAGE_UPLOAD'
  })

  _instance.on('child_added', function(snapshot) {
    console.log(snapshot.val());
  })
}
