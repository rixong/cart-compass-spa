
import { instance } from '../../api/axios';
import { AppThunk } from '../index';

import { 
  IMasterListItem, 
  ADDED_ITEM_TO_MASTERLIST, 
  REMOVED_FROM_MASTER_LIST 
} from './types'

export const doAddItemToMasterList = (item: IMasterListItem): AppThunk => async dispatch => {
  try {
    const response = await instance.post('/items',item)
    console.log(response.data);
    if (!response.data.error) {
      dispatch({
        type: ADDED_ITEM_TO_MASTERLIST,
        payload: response.data,
      })
    }
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