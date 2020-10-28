import React, { useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import Modal from "./component/modal";

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
import "./style/modal-style.css";

const App = (props) => {
  useEffect(() => {
    props.onLoad();
  }, []);
  
  return (
      <BrowserRouter>
        <div className="App">
        <Modal />
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
    )
}


const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(firstLoad())
  };
};

export default connect(null, mapDispatchToProps)(App)
