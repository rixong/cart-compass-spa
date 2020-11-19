/// Top Level Reducer
import { ThunkAction } from 'redux-thunk';

import { combineReducers, Action } from 'redux';

import { SystemState } from './system/types';
import { ListsState } from './lists/types';
import { CategoriesState } from './categories/types';
import { MasterListState } from './masterlist/types';

import systemReducer from './system/reducers';
import listReducer from './lists/reducers';
import categoryReducer from './categories/reducers';
import masterListReducer from './masterlist/reducers';

export interface ApplicationState {
  system: SystemState;
  lists: ListsState;
  categories: CategoriesState;
  masterList: MasterListState;
}

export const rootReducer = combineReducers<ApplicationState>({
  system: systemReducer,
  lists: listReducer,
  categories: categoryReducer,
  masterList: masterListReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>


