
import { instance } from '../../api/axios';
import { AppThunk } from '../index';
import { ADD_CATEGORIES, REORDERED_CATEGORIES, ADD_SORT_ORDER, ISortOrder } from './types';


export const doAddCategories = (): AppThunk => async dispatch => {
  try {
    const response = await instance.get('/categories');
    // console.log(response.data);
    
    dispatch ({
      type:ADD_CATEGORIES,
      payload: response.data
    })
  } catch (e) {
    console.log("Error occured fetching categories.", e);
  }
}

export const doAddSortOrder = (sortOrder: ISortOrder[]) => {
  return {
    type: ADD_SORT_ORDER,
    payload: sortOrder
  }
}

export const doReorderSortOrder = (newOrder: ISortOrder[]): AppThunk => async dispatch => {
  await instance.post('/categories', [ ...newOrder ])
  dispatch({
    type: REORDERED_CATEGORIES,
    payload: newOrder
  })
}