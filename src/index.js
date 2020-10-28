import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";

import authReducer from './store/authorization/authReducer';
import alertsReducer from './store/alerts/alertsReducer';
import customersReducer from './store/customers/customersReducer';
import documentReducer from './store/documents/documentReducer';
import accOfficeReducer from './store/accountingOffice/accOfficeReducer';
import settingsReducer from './store/settings/settingsReducer';
import bankReducer from "./store/bankAccounts/bankReducer";
import contractorsReducer from "./store/contractors/contractorsReducer";
import commodityReducer from "./store/commodity/commodityReducer";
import invoiceReducer from "./store/invoice/invoiceReducer";


const rootReducer = combineReducers({
  alertsReducer,
  authReducer,
  customersReducer,
  documentReducer,
  accOfficeReducer,
  settingsReducer,
  bankReducer,
  contractorsReducer,
  commodityReducer,
  invoiceReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
