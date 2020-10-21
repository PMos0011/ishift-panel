import React, { useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import { positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Header from './component/header/header';
import LoginForm from "./component/loginForm/loginForm";
import Content from './component/content/content';
import Footer from './component/footer/footer';

import { firstLoad } from './store/firstLoad';

import './App.css';
import './style/doc-style.css';
import './style/form-style.css';
import './style/header.css';
import './style/sidebar-style.css';
import './style/style.css';
import './style/table-style.css';
import './style/invoice-commodity-style.css';

const options = {
  position: positions.MIDDLE,
  timeout: 5000,
}

const App = (props) => {
  useEffect(() => {
    props.onLoad();
  }, []);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
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
            <Footer />
        </div>
      </BrowserRouter>
    </AlertProvider>)
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(firstLoad())
  };
};

export default connect(null, mapDispatchToProps)(App);
