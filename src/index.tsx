import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Store } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import './fresca.css';

import shoppingListReducer from './reducers';
import App from './components/App';
require ('bootstrap')


// const logger = store => next => action => {
//   console.log('dispatching', action);
//   let result = next(action);
//   console.log('next state', store.getState());
//   return result;
// };

const middlewares = [thunk];

// if ( process.env.NODE_ENV === 'development') {    
//   middlewares.push(logger);    
// }

const store : Store & {
  dispatch: DispatchType
} = createStore(
  shoppingListReducer,
  applyMiddleware(...middlewares)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
