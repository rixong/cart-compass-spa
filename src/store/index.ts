/// REDUCERS

import {combineReducers} from 'redux';

import systemReducer from './system/reducers';
// import listReducer from './lists/reducers';
// import categoryReducer from './categories.ts/reducers';
// import masterlistReducer from './masterlist/reducers';

const rootReducer = combineReducers<AppState>({
  system: systemReducer,
  // currentList: listReducer,
  // categories: categoryReducer,
  // masterlist: masterlistReducer,
})




