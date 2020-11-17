/// Top Level Reducer


import {combineReducers} from 'redux';
import {SystemState} from './system/types';
// import categoryReducer from './categories.ts/types';
// import masterlistReducer from './masterlist/types';

import systemReducer from './system/reducers';
// import listReducer from './lists/reducers';
// import categoryReducer from './categories.ts/reducers';
// import masterlistReducer from './masterlist/reducers';

export interface ApplicationState {
  system: SystemState;
}


export const rootReducer = combineReducers<ApplicationState>({
  system: systemReducer,
  // currentList: listReducer,
  // categories: categoryReducer,
  // masterlist: masterlistReducer,
})

export type RootState = ReturnType<typeof rootReducer>




