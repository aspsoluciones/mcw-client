/**
 * Created by epotignano on 16/03/16.
 */


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

export function UploadImage(imageFile) {


}
