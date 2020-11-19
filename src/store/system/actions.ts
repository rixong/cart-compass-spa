import { instance } from '../../api/axios';
import { 
  IUser, 
  ILogin, 
  ADDED_CURRENT_USER,
  USER_CLEARED,
  STARTED_LOADING,
  FINISHED_LOADING,
  ADDED_NOTIFICATION,
  CLEARED_NOTIFICATION, 
  SystemActionTypes 
} from './types';
// import {useDispatch} from 'react-redux';
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
      console.log('New',response)
      // Login User
    } else {
      response = await instance.post(`/login`, logonInfo)
      console.log('Login',response)
    }
    if(response.statusText === 'OK'){
      localStorage.setItem('token', response.data.token)
      const user: IUser = {
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        currentList: response.data.user.currentList
      }
      dispatch(addCurrentUser(user));
    }
  } catch (e) {
    console.log('server error', e.message)
  }
  dispatch({ type: FINISHED_LOADING });
  
}

// Token is included in header as Axios interceptor (see API/axios.ts).
export const doAutoLogin = (): ThunkAction<void, RootState, unknown, Action<any>> => async dispatch => {
  dispatch({ type: STARTED_LOADING });
  try {
    const response = await instance.get('/profile');
    console.log(response)
    if(response.data.user){
      const user: IUser = {
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        currentList: response.data.user.currentList
      }
      dispatch(addCurrentUser(user))
    }
  }
  catch (e) {
    console.log('server error', e.message)
  }
    dispatch({ type: FINISHED_LOADING });
}


export const doLogoutUser = () => {
  return {
    type: USER_CLEARED,
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
    type: ADDED_NOTIFICATION,
    payload: { error: true, message }
  }
}

export const clearNotification = () => {
  return {
    type: CLEARED_NOTIFICATION,
    payload: { error: false, message: '' }
  }
}
