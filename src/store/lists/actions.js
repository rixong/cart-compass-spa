/* import axios from 'axios';
import { config } from '../../const';
import {instance} from '../../api/axios';


export const doCreateNewList = (name) => async dispatch => {
  try {
    const response = (await instance.post('/lists', {name})).data
    dispatch({
      type: 'ADDED_NEW_LIST',
      payload: response.list
    })
  }
  catch (e) {
    console.log('server error', e.message)
  }
}

export const doChangeCurrentList = (list_id) => async dispatch => {
  // console.log('From action')
  try {
    const response = (await instance.patch(`${baseURL}/users`, {list_id})).data
    if (response.status === 'ok') {
      dispatch({
        type: "CHANGED_CURRENT_LIST",
        payload: list_id
      })
    } else {
      dispatch(addNotification(response.message))
    }
  }
  catch (e) {
    console.log('server error', e.message)
  }
}

export const doRemoveList = (listId) => async dispatch => {
  try {
    await instance.delete(`/lists/${listId}`)
    dispatch({
      type: 'REMOVED_LIST',
      payload: listId
    })
  }
  catch (e) {
    console.log('Remove list - server error', e.message)
  }
}

// CURRENT LIST_ITEM REQUESTS
export const doGetCurrentListItems = (list_id) => async dispatch => {
  try {
    const response = (await axios.get(`${baseURL}/lists/current/${list_id}`)).data
    dispatch({
      type: 'RETRIEVED_LIST_ITEMS',
      payload: response
    })
  }
  catch (e) {
    console.log('server error', e.message)
  }
}

export const doAddItemToCurrentList = (listItem) => async dispatch => {
  try {
    const response = (await instance.post('/list_items', {
      item_id: listItem.item_id,
      list_id: listItem.list_id,
      quantity: listItem.quantity
    })).data
    console.log(response)
    if (response.status === 'exists') {
      dispatch(addNotification(response.message))
    } else {
      dispatch({
        type: 'ADDED_ITEM_TO_CUR_LIST',
        payload: response.listItem
      })
    }
  }
  catch (e) {
    dispatch(addNotification(e.message))
  }
}

export const doRemoveItemFromCurList = (itemId) => {
  return {
    type: 'REMOVED_ITEMS_FROM_CUR_LIST',
    payload: itemId
  }
}

export const doChangeItemStatus = (item) => async dispatch => {
  try {
    const response = (await instance.patch(`/list_items/${item.id}`)).data
    // console.log(response)
    dispatch({
      type: 'CHANGED_ITEMS_STATUS',
      payload: response.listItem
    })
  }
  catch (e) {
    dispatch(addNotification(e.message))
  }
}


 */