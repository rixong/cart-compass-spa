export {}

/* // import axios from 'axios';
// import { config } from '../../const';
import { instance } from '../../api/axios';
import { IMasterListItem, ADDED_ITEM_TO_MASTERLIST, REMOVED_FROM_MASTER_LIST, MasterlistActions } from './types'

export const AddItemToMasterList = (item :IMasterListItem): MasterlistActions => async dispatch => {
  try {
    const response = (await instance.post('/items', {
      user_id: user_id,
      name: item.name,
      category_id: item.category_id
    })).data
    console.log(response)
    if (response.status !== 'exists') {
      dispatch({
        type: 'ADDED_ITEM_TO_MASTERLIST',
        payload: response.item
      })
    }
    // dispatch(doAddItemToCurrentList({ item_id: response.item.id, list_id, quantity: item.quantity }))
  }
  catch (e) {
    // dispatch(addNotification(e.message))
  }
}

export const doRemoveFromMasterList = (itemId) => async dispatch => {
  try {
    await instance.delete(`/items/${itemId}`)  //Removes from master list and list_items
    // dispatch(doRemoveItemFromCurList(itemId))
    dispatch({
      type: 'REMOVED_FROM_MASTER_LIST',
      payload: itemId
    })
  }
  catch (e) {
    // dispatch(addNotification(e.message))
  }
}
 */