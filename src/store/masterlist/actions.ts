
import { instance } from '../../api/axios';
import { AppThunk } from '../index';

import { 
  // IMasterListItem, 
  ADDED_ITEM_TO_MASTERLIST, 
  REMOVED_FROM_MASTER_LIST 
} from './types'
import { doAddItemToCurrentList } from '../lists/actions';
import { INewItem } from '../lists/types';

export const doAddItemToMasterList = (item: INewItem): AppThunk => async dispatch => {
  try {
    // Check if item exists in masterlist. If not add... 
    const response = await instance.post('/items',item)
    console.log(response);
    // Status 203 if already exists, 201 if newly created
    if (response.status === 201) {
      dispatch({
        type: ADDED_ITEM_TO_MASTERLIST,
        payload: response.data,
      })
    }
    // ... then send item to add to current list (lists/actions)
    dispatch(doAddItemToCurrentList(response.data, item.quantity))
  }
  catch (e) {
    console.log(e);
    // dispatch(addNotification(e.message))
  }
    
}

export const doRemoveFromMasterList = (itemId: string): AppThunk => async dispatch => {
  try {
    await instance.delete(`/items/${itemId}`)  //Removes from master list and list_items
    // dispatch(doRemoveItemFromCurList(itemId))
    dispatch({
      type: REMOVED_FROM_MASTER_LIST,
      payload: itemId
    })
  }
  catch (e) {
    // dispatch(addNotification(e.message))
  }
}