
import { instance } from '../../api/axios';
import { AppThunk } from '../index';

import { IMasterListItem, ADDED_ITEM_TO_MASTERLIST, REMOVED_FROM_MASTER_LIST, MasterListActions } from './types'

export const addItemToMasterList = (item: IMasterListItem): AppThunk => async dispatch => {
  try {
    console.log("Master item");
    
    const response = (await instance.post('/items',item)).data
    console.log(response)
    // if (response.status !== 'exists') {
      dispatch({
        type: 'ADDED_ITEM_TO_MASTERLIST',
        payload: response,
      })
    // }
    // dispatch(doAddItemToCurrentList({ item_id: response.item.id, list_id, quantity: item.quantity }))
  }
  catch (e) {
    // dispatch(addNotification(e.message))
  }
}

// export const doRemoveFromMasterList = (itemId) => async dispatch => {
//   try {
//     await instance.delete(`/items/${itemId}`)  //Removes from master list and list_items
//     // dispatch(doRemoveItemFromCurList(itemId))
//     dispatch({
//       type: 'REMOVED_FROM_MASTER_LIST',
//       payload: itemId
//     })
//   }
//   catch (e) {
//     // dispatch(addNotification(e.message))
//   }
// }