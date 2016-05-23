/**
 * Created by epotignano on 19/4/16.
 */
import axios from 'axios';
import { ApiRef } from '../constants/Commons'
axios.defaults.baseURL = ApiRef;
axios.defaults.headers.post['Content-Type'] = 'application/json';
