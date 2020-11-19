import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { instance } from '../../api/axios';
import {
  IUser,
  ILogin,
  ADDED_CURRENT_USER,
  USER_CLEARED,
  SET_CURRENT_LIST,
  STARTED_LOADING,
  FINISHED_LOADING,
  ADDED_NOTIFICATION,
  CLEARED_NOTIFICATION,
  SystemActionTypes
} from './types';

import { ADDED_NEW_LIST } from '../lists/types';
import { ADD_CATEGORIES } from '../categories/types';
import { ADD_MASTERLIST_ITEMS } from '../masterlist/types';
import { AppThunk } from '../index';

export const doLogin = (logonInfo: ILogin): AppThunk => async dispatch => {
  console.log('From login action');
  let response
  try {
    if (logonInfo.passwordConfirmation) {
      // Create New User
      response = await instance.post(`/users`, logonInfo)
      console.log('New', response)
      // Login User
    } else {
      response = await instance.post(`/login`, logonInfo)
      console.log('Login', response)
    }
    if (response.statusText === 'OK') {
      localStorage.setItem('token', response.data.token)
      const user: IUser = {
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        currentList: response.data.user.currentList
      }
      dispatch(addCurrentUser(user));
      dispatch({
        type: ADDED_NEW_LIST,
        payload: response.data.user.lists,
      })
      dispatch({
        type: ADD_CATEGORIES,
        payload: response.data.user.categories,
      })
    }
  } catch (e) {
    console.log('server error', e.message)
  }
  dispatch({ type: FINISHED_LOADING });

}

// Token is included in header as Axios interceptor (see API/axios.ts).
export const doAutoLogin = (): AppThunk => async dispatch => {
  dispatch({ type: STARTED_LOADING });
  try {
    const response = await instance.get('/profile');
    console.log(response)
    if (response.data.user) {
      const user: IUser = {
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        currentList: response.data.user.currentList
      }
      dispatch(addCurrentUser(user))
      dispatch({
        type: ADDED_NEW_LIST,
        payload: response.data.user.lists,
      })
      dispatch({
        type: ADD_CATEGORIES,
        payload: response.data.user.categories,
      })
      dispatch({
        type: ADD_MASTERLIST_ITEMS,
        payload: response.data.user.masterList,
      })
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

export const doSetCurrentList = (listId: string): AppThunk => async dispatch => {
  const response = await instance.post(`/lists/current/${listId}`);
  console.log('From Action');
  dispatch({
    type: SET_CURRENT_LIST,
    payload: listId,
  })
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


//  (): ThunkAction<void, RootState, unknown, Action<any>>