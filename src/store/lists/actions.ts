import { instance } from "../../api/axios";
import { AppThunk } from "../index";
import {
  IListItem,
  ADDED_NEW_LIST,
  REMOVED_LIST,
  FETCHED_INITIAL_LISTS,
  FETCHED_CURRENT_LIST_ITEMS,
  CHANGED_ITEMS_STATUS,
} from "./types";

import { addNotification } from "../system/actions";

export const doFetchUsersLists = (): AppThunk => async (dispatch) => {
  try {
    const response = (await instance.get("/lists")).data;
    dispatch({
      type: FETCHED_INITIAL_LISTS,
      payload: { lists: response },
    });
  } catch (e) {
    console.log("Bad dog");
  }
};

export const doCreateNewList = (name: string): AppThunk => async (dispatch) => {
  try {
    const response = (await instance.post("/lists", { name })).data;
    // console.log(response);
    dispatch({
      type: ADDED_NEW_LIST,
      payload: response,
    });
  } catch (e) {
    console.log("server error", e.message);
  }
};

export const doRemoveList = (listId: string): AppThunk => async (dispatch) => {
  try {
    await instance.delete(`/lists/${listId}`);
    dispatch({
      type: REMOVED_LIST,
      payload: listId,
    });
  } catch (e) {
    console.log("Remove list - server error", e.message);
  }
};

// CURRENT LIST_ITEM REQUESTS
export const doFetchCurrentListItems = (): AppThunk => async (dispatch) => {
  try {
    const response = await instance.get(`/lists/current/`);
    // console.log(response.data.listItems);
    if (response.data.listItems) {
      dispatch({
        type: FETCHED_CURRENT_LIST_ITEMS,
        payload: { items: response.data.listItems },
      });
    }
  } catch (e) {
    console.log("server error", e.message);
  }
};

export const doAddItemToCurrentList = (
  name: string,
  quantity: string,
  categoryId: string
): AppThunk => async (dispatch, getState) => {
  try {
    // Create new list Item using returned master Item and quantity
    const newCurrentListItem: IListItem = {
      name,
      quantity,
      categoryId,
      isActive: true,
    };
    // Add item to DB and local current lists
    // const curList: string = getState().system.curUser.currentList;
    const response = await instance.post("/lists/items", newCurrentListItem);
    // console.log(response);
    dispatch({
      type: "ADDED_ITEM_TO_CUR_LIST",
      payload: { item: response.data },
    });
  } catch (e) {
    dispatch(addNotification(e.response.data));
  }
};

export const doRemoveItemFromCurList = (name: string, curList: string) => {
  return {
    type: "REMOVED_ITEMS_FROM_CUR_LIST",
    payload: { name, curList },
  };
};

// export const doRemoveItemFromAllLists = (itemId: string) => {
//   return {
//     type: REMOVED_ITEM_FROM_ALL_LISTS,
//     payload: itemId,
//   };
// };

export const doChangeItemStatus = (name: string): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const response = await instance.patch(`/lists/items/${name}`);
    const curList: string = getState().system.curUser.currentList;
    dispatch({
      type: CHANGED_ITEMS_STATUS,
      payload: { item: response.data, curList },
    });
  } catch (e) {
    console.log(e);
    // dispatch(addNotification(e.message))
  }
};
