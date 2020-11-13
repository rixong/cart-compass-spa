/* import axios from 'axios';
import { config } from '../../const';
import {instance} from '../../api/axios';

export const doLogin = (user) => async dispatch => {
  dispatch({ type: 'STARTED_LOADING' });
  let response;
  try {
    if (user.password_confirmation) {
      // console.log('New user')
      response = (await axios.post(`${baseURL}/users`, user)).data
    } else {
      // console.log('Login')
      response = (await axios.post(`${baseURL}/login`, user)).data
    }
    if (response.status === 'ok') {
      localStorage.setItem('jwt', response.jwt);
      dispatch({
        type: "ADDED_CURRENT_USER",
        payload: response.user
      })
    } else {
      dispatch(addNotification(response.message));
    }
  }
  catch (e) {
    console.log('server error', e.message)
  }
  dispatch({ type: 'FINISHED_LOADING' });
}


export const doAutoLogin = (token) => async dispatch => {
  dispatch({ type: 'STARTED_LOADING' });
  try {
    const response = (await instance.get('/profile')).data;
    if (response.status === 'ok') {
      dispatch({
        type: "ADDED_CURRENT_USER",
        payload: response.user
      })
    } else {
      console.log(response.message)
    }
  }
  catch (e) {
    console.log('server error', e.message)
  }
    dispatch({ type: 'FINISHED_LOADING' });
}

export const doLogoutUser = () => {
  return {
    type: "USER_CLEARED",
  }
}

/// UTLITIES
export const addNotification = (message) => {
  return {
    type: 'ADDED_NOTIFICATION',
    payload: { error: true, message }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEARED_NOTIFICATION',
    payload: { error: false, message: '' }
  }
}
 */