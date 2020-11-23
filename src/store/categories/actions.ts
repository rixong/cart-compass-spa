
import { instance } from '../../api/axios';
import { AppThunk } from '../index';
import { ADD_CATEGORIES } from './types';


export const doAddCategories = (): AppThunk => async dispatch => {
  try {
    const response = await instance.get('/categories');
    dispatch ({
      type:ADD_CATEGORIES,
      payload: response.data
    })
  } catch (e) {
    console.log("Error occured fetching categories.", e);
    
  }
}

export const doReorderCategories = (userId: string, newOrder: []): AppThunk => async dispatch => {
  // console.log('from action', newOrder)
  await instance.post('/categories', { user_id: userId, order: newOrder.join(',') })
  dispatch({
    type: 'REORDERED_CATEGORIES',
    payload: newOrder
  })
}