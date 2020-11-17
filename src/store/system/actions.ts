import { instance } from '../../api/axios';
import { IUser, ILogin, ADDED_CURRENT_USER, SystemActionTypes } from './types';
// import {useDispatch} from 'react-redux';
// import { config } from '../../const';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';
import { Action } from 'redux';


export const doLogin = (logonInfo: ILogin): ThunkAction<void, RootState, unknown, Action<any>> => async dispatch => {
  console.log('From login action');
  let response
  try {
    if(logonInfo.passwordConfirmation){
      // Create New User
      response = await instance.post(`/users`, logonInfo)
      console.log('Login',response.data)
    } else {
      // Login User
      response = await instance.post(`/login`, logonInfo)
      console.log('New',response.data)
    }
    localStorage.setItem('token', response.data.token)
    const user: IUser = {
      id: response.data.user._id,
      name: response.data.user.name,
      email: response.data.user.email,
      currentList: response.data.user.currentList
    }
    dispatch(addCurrentUser(user));
  } catch (e) {
    console.log('server error', e.message)
  }
}

/* export const doLogin = (user: <ILogin>) => {
    async (dispatch) => {
      dispatch();
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
 */

/* export const doAutoLogin = (token) => async dispatch => {
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
 */

export const doLogoutUser = () => {
  return {
    type: "USER_CLEARED",
  }
}

export const addCurrentUser = (user: IUser): SystemActionTypes => {
  return {
    type: ADDED_CURRENT_USER,
    payload: user
  }
}

/// UTLITIES
export const addNotification = (message: string) => {
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
