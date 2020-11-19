/// Top Level Reducer
import { ThunkAction } from 'redux-thunk';

import { combineReducers, Action } from 'redux';

import { SystemState } from './system/types';
import { ListsState } from './lists/types';
import {CategoriesState, categoryState} from './categories.ts/types';
// import masterlistReducer from './masterlist/types';

import systemReducer from './system/reducers';
import listReducer from './lists/reducers';
import categoryReducer from './categories.ts/reducers';
// import masterlistReducer from './masterlist/reducers';

export interface ApplicationState {
  system: SystemState;
  lists: ListsState;
  categories: CategoriesState;
}


export const rootReducer = combineReducers<ApplicationState>({
  system: systemReducer,
  lists: listReducer,
  categories: categoryReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>


