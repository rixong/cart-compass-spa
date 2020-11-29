
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

import { FETCHED_INITIAL_LISTS_AND_SORT_ORDER, CLEARED_ALL_LISTS } from '../lists/types';
import { doAddCategories } from '../categories/actions'
import { ADDED_ITEM_TO_MASTERLIST, CLEARED_MASTERLIST } from '../masterlist/types';
import { AppThunk } from '../index';

// New User OR Login Existing User
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
        currentList: response.data.user.currentList,
        sharedWithMe: response.data.user.sharedWithMe
      }
      dispatch(addCurrentUser(user));
      dispatch({
        type: FETCHED_INITIAL_LISTS_AND_SORT_ORDER,
        payload: {
          lists: response.data.user.lists,
          sortOrder: response.data.user.sortOrder,
        },
      })
      dispatch({
        type: ADDED_ITEM_TO_MASTERLIST,
        payload: response.data.user.masterList,
      })
      dispatch(doAddCategories());
    }
  } catch (e) {
    console.log('server error', e.message)
  }
  dispatch({ type: FINISHED_LOADING });
}

//Profile - Renew session
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
        currentList: response.data.user.currentList,
        sharedWithMe: response.data.user.sharedWithMe
      }
      dispatch(addCurrentUser(user));
      dispatch({
        type: FETCHED_INITIAL_LISTS_AND_SORT_ORDER,
        payload: {
          lists: response.data.user.lists,
          sortOrder: response.data.user.sortOrder,
        },
      })
      dispatch({
        type: ADDED_ITEM_TO_MASTERLIST,
        payload: response.data.user.masterList,
      })
      dispatch(doAddCategories());
    }
  }
  catch (e) {
    console.log('server error', e.message)
  }
  dispatch({ type: FINISHED_LOADING });
}


export const doLogoutUser = (): AppThunk => async dispatch => {
  try{
    await instance.get('/logout');
    dispatch({
      type: USER_CLEARED
    });
    dispatch({
      type: CLEARED_ALL_LISTS
    })
    dispatch({
      type: CLEARED_MASTERLIST
    })
  } catch(e){
    console.log("Error logging out.", e);
  }
}

export const addCurrentUser = (user: IUser): SystemActionTypes => {
  return {
    type: ADDED_CURRENT_USER,
    payload: user
  }
}

export const doSetCurrentList = (listId: string): AppThunk => async dispatch => {
  try {
    const response = await instance.post(`/lists/current/${listId}`);
    console.log(response);
    if (response.status === 204) {
      dispatch({
        type: SET_CURRENT_LIST,
        payload: listId,
      })
    }
  } catch (e) {
    console.log('server error', e.message)
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
