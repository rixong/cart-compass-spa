import { instance } from "../../api/axios";

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
} from "./types";

import { FETCHED_INITIAL_LISTS, CLEARED_ALL_LISTS } from "../lists/types";
import { doAddCategories } from "../categories/actions";
import { ADD_SORT_ORDER, CLEAR_SORT_ORDER } from "../categories/types";
import {
  ADDED_ITEM_TO_MASTERLIST,
  CLEARED_MASTERLIST,
} from "../masterlist/types";
import { AppThunk } from "../index";

// New User OR Login Existing User
export const doLogin = (logonInfo: ILogin): AppThunk => async (dispatch) => {
  dispatch({ type: STARTED_LOADING });
  let response;
  try {
    if (logonInfo.passwordConfirmation) {
      // Create New User
      response = await instance.post(`/users`, logonInfo);

      // Login User
    } else {
      response = await instance.post(`/login`, logonInfo);
    }

    if (response.data.error){
      dispatch (addNotification(response.data.error))
    } else {
      localStorage.setItem("token", response.data.token);
      await dispatch(doAddCategories());
      await dispatch(intitializeUserSessionData(response));
    }
  } catch (e) {
    console.log("server error", e.response.data.error);
    dispatch(addNotification(e.response.data.error));
  }
  dispatch({ type: FINISHED_LOADING });
};

//Profile - Renew session
// Token is included in header as Axios interceptor (see API/axios.ts).
export const doAutoLogin = (): AppThunk => async (dispatch) => {
  dispatch({ type: STARTED_LOADING });
  try {
    const response = await instance.get("/profile");
    await dispatch(doAddCategories());
    await dispatch(intitializeUserSessionData(response));
  } catch (e) {
    console.log("server error", e.message);
  }
  dispatch({ type: FINISHED_LOADING });
};

const intitializeUserSessionData = (response: any): AppThunk => async (
  dispatch
) => {
  const { user } = response.data;
  // console.log(user);
  const newUser: IUser = {
    id: response.data.user._id,
    name: response.data.user.name,
    email: response.data.user.email,
    currentList: response.data.user.currentList,
    sharedWithMe: response.data.user.sharedWithMe,
  };
  dispatch({
    type: ADDED_CURRENT_USER,
    payload: newUser,
  });
  dispatch({
    type: FETCHED_INITIAL_LISTS,
    payload: {
      lists: user.lists,
    },
  });
  dispatch({
    type: ADDED_ITEM_TO_MASTERLIST,
    payload: user.masterList,
  });
  dispatch({
    type: ADD_SORT_ORDER,
    payload: user.sortOrder,
  });
};

export const doLogoutUser = (): AppThunk => async (dispatch) => {
  try {
    await instance.get("/logout");
    localStorage.removeItem("token");
    dispatch({
      type: USER_CLEARED,
    });
    dispatch({
      type: CLEARED_ALL_LISTS,
    });
    dispatch({
      type: CLEARED_MASTERLIST,
    });
    dispatch({
      type: CLEAR_SORT_ORDER,
    });
  } catch (e) {
    console.log("Error logging out.", e);
  }
};

// export const addCurrentUser = (user: IUser): SystemActionTypes => {
//   return {
//     type: ADDED_CURRENT_USER,
//     payload: user
//   }
// }

export const doSetCurrentList = (listId: string): AppThunk => async (
  dispatch
) => {
  try {
    const response = await instance.post(`/lists/current/${listId}`);
    if (response.status === 200) {
      dispatch({
        type: SET_CURRENT_LIST,
        payload: listId,
      });
    }
  } catch (e) {
    console.log("server error", e.message);
  }
};

/// UTLITIES
export const addNotification = (message: string) => {
  return {
    type: ADDED_NOTIFICATION,
    payload: message,
  };
};

export const clearNotification = () => {
  return {
    type: CLEARED_NOTIFICATION,
  };
};
