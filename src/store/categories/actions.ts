
import {instance} from '../../api/axios';
import {AppThunk} from '../index';
import {categoryActions, ADD_CATEGORIES, ICategory} from './types';

// export const addCategories = (categories: ICategory[]) => {
//   return {
//     type: ADD_CATEGORIES,
//     payload: categories
//   }
// }

export const doReorderCategories = (userId: string, newOrder: []): AppThunk => async dispatch => {
  // console.log('from action', newOrder)
  await instance.post('/categories', { user_id: userId, order: newOrder.join(',') })

  dispatch({
    type: 'REORDERED_CATEGORIES',
    payload: newOrder
  })
}