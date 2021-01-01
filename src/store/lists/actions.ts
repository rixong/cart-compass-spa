import { instance } from '../../api/axios';
import { AppThunk } from '../index';
import {
  IListItem,
  ADDED_NEW_LIST,
  REMOVED_LIST,
  FETCHED_CURRENT_LIST_ITEMS,
  REMOVED_ITEM_FROM_ALL_LISTS,
  CHANGED_ITEMS_STATUS,
} from './types'
import {addNotification} from '../system/actions';

export const doCreateNewList = (name: string): AppThunk => async dispatch => {
  try {
    const response = (await instance.post('/lists', { name })).data
    // console.log(response);
    dispatch({
      type: ADDED_NEW_LIST,
      payload: response,
    });
  }
  catch (e) {
    console.log('server error', e.message)
  }
}

export const doRemoveList = (listId: string): AppThunk => async dispatch => {
  try {
    await instance.delete(`/lists/${listId}`)
    dispatch({
      type: REMOVED_LIST,
      payload: listId
    })
  }
  catch (e) {
    console.log('Remove list - server error', e.message)
  }
}

// CURRENT LIST_ITEM REQUESTS
export const doFetchCurrentListItems = (listId: string): AppThunk => async dispatch => {
  try {
    const response = await instance.get(`/lists/current/`)
    console.log(response.data);
    dispatch({
      type: FETCHED_CURRENT_LIST_ITEMS,
      payload: response.data
    })
  }
  catch (e) {
    console.log('server error', e.message)
  }
}

export const doAddItemToCurrentList = (masterItemId: string, quantity: string): AppThunk => async (dispatch, getState) => {
  try {
  // Create new list Item using returned master Item and quantity
  const newCurrentListItem: IListItem = {
    _id: '',
    masterItemId,
    quantity,
    active: true
  }
  // Add item to DB and local current lists
  // const curList: string = getState().system.curUser.currentList;
  const response = await instance.post('/lists/items', newCurrentListItem)
  // console.log(response);
    dispatch({
      type: 'ADDED_ITEM_TO_CUR_LIST',
      payload: { item: response.data }
    })
  }
  catch (e) {
    dispatch(addNotification(e.response.data))
  }
}

export const doRemoveItemFromCurList = (itemId: string, curList: string) => {
  return {
    type: 'REMOVED_ITEMS_FROM_CUR_LIST',
    payload: { itemId, curList }
  }
}

export const doRemoveItemFromAllLists = (itemId: string) => {
  return {
    type: REMOVED_ITEM_FROM_ALL_LISTS,
    payload: itemId
  }
}

export const doChangeItemStatus = (itemId: string): AppThunk => async (dispatch, getState) => {
  try {
    const response = await instance.patch(`/lists/items/${itemId}`)
    const curList: string = getState().system.curUser.currentList;
    dispatch({
      type: CHANGED_ITEMS_STATUS,
      payload: { item: response.data, curList }
    })
  }
  catch (e) {
    console.log('Error', e);

    // dispatch(addNotification(e.message))
  }
}


