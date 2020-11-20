
import { instance } from '../../api/axios';
import { AppThunk } from '../index';
import { } from './types';

export const doReorderCategories = (userId: string, newOrder: []): AppThunk => async dispatch => {
  // console.log('from action', newOrder)
  await instance.post('/categories', { user_id: userId, order: newOrder.join(',') })
  dispatch({
    type: 'REORDERED_CATEGORIES',
    payload: newOrder
  })
}