import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Store, Middleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import './fresca.css';

import { rootReducer, ApplicationState, RootState } from './store';
import App from './components/App';
require('bootstrap')


const logger: Middleware<{}, RootState> = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const middlewares = [thunk, logger];

// if ( process.env.NODE_ENV === 'development') {    
//   middlewares.push(logger);    
// }
function configureStore(): Store<ApplicationState> {
  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  )
  return store
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
