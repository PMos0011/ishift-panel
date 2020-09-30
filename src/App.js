import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import Header from './component/header/header';
import LoginForm from "./component/loginForm/loginForm";
import Content from './component/content/content';

import { firstLoad } from './store/authorization/authAction';

import './App.css'

const App = (props) => {

  props.onLoad();

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route
          path="/auth"
          component={Content} />
        <Route
          path="/"
          component={LoginForm}
          exact />
      </div>
    </BrowserRouter>)
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(firstLoad())
  };
};

export default connect(null, mapDispatchToProps)(App);
