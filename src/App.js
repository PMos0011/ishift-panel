import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from './component/header/header';
import Content from './component/content/content';

import { firstLoad } from './store/authAction';

import './App.css'

const App = (props) => {

  props.onLoad();

    

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Content />
      </div>
    </BrowserRouter>)
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(firstLoad())
  };
};

export default connect(null, mapDispatchToProps)(App);
