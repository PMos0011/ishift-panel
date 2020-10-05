import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";

import authReducer from './store/authorization/authReducer';
import errorReducer from './store/errosHandling/errorReducer';
import customerReducer from './store/customers/customersReducer';
import documentReducer from './store/documents/documentsReducer';
import accOfficeReducer from './store/accountingOffice/accOfficeReducer';

const rootReducer = combineReducers({
  errorReducer,
  authReducer,
  customerReducer,
  documentReducer,
  accOfficeReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
