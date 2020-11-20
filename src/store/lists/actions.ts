import { instance } from '../../api/axios';
import { AppThunk } from '../index';
import {
  IListItem,
  INewItem,
  ADDED_NEW_LIST,
  REMOVED_LIST
} from './types'
// import { doAddItemToMasterList } from '../masterlist/actions';
import { IMasterListItem } from '../masterlist/types';

export const doCreateNewList = (name: string): AppThunk => async dispatch => {
  console.log('Create List');

  try {
    const response = (await instance.post('/lists', { name })).data
    console.log(response);
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
// export const doGetCurrentListItems = (list_id) => async dispatch => {
//   try {
//     const response = (await axios.get(`/lists/current/${list_id}`)).data
//     dispatch({
//       type: 'RETRIEVED_LIST_ITEMS',
//       payload: response
//     })
//   }
//   catch (e) {
//     console.log('server error', e.message)
//   }
// }

export const doAddItemToCurrentList = (item: IMasterListItem, quantity: string): AppThunk => async dispatch => {
  // Check if name exists in local? current list - yes: stop
  console.log("XXXX");
  
  try {
    // Create new list Item using returned master Item and quantity
    const newCurrentListItem: IListItem = {
      masterItemId: item._id,
      quantity,
      active: true
    }
    // Add item to DB and local current lists

    const response = (await instance.post('/list/items', newCurrentListItem))
    console.log(response.data)
    if (response.status === 200) {
      // dispatch(addNotification(response.message))
    } else {
      // dispatch({
      //   type: 'ADDED_ITEM_TO_CUR_LIST',
      //   payload: response.data
      // })
    }
  }
  catch (e) {
    // dispatch(addNotification(e.message))
  }
}


// export const doRemoveItemFromCurList = (itemId) => {
//   return {
//     type: 'REMOVED_ITEMS_FROM_CUR_LIST',
//     payload: itemId
//   }
// }

export const doChangeItemStatus = (item: IListItem): AppThunk => async dispatch => {
  try {
    const response = (await instance.patch(`/list_items/${item._id}`)).data
    // console.log(response)
    dispatch({
      type: 'CHANGED_ITEMS_STATUS',
      payload: response.listItem
    })
  }
  catch (e) {
    // dispatch(addNotification(e.message))
  }
}


