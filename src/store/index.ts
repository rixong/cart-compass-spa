/// Top Level Reducer


import { combineReducers } from 'redux';

import { SystemState } from './system/types';
import { ListsState } from './lists/types';
// import categoryReducer from './categories.ts/types';
// import masterlistReducer from './masterlist/types';

import systemReducer from './system/reducers';
import listReducer from './lists/reducers';
// import categoryReducer from './categories.ts/reducers';
// import masterlistReducer from './masterlist/reducers';

export interface ApplicationState {
  system: SystemState;
  lists: ListsState;
}


export const rootReducer = combineReducers<ApplicationState>({
  system: systemReducer,
  lists: listReducer
})

export type RootState = ReturnType<typeof rootReducer>




