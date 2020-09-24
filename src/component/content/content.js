import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import LoginForm from '../loginForm/loginForm';
import BasicsInfo from '../basicsInfo/basicsInfo';

import {checkUserAuthentication, logoutUser} from '../../store/authAction';

import '../style.css';

const Content = (props) => {

    props.onLoad();
    let AuthorizationRedirect = null;

    if (!props.isAuth) {
        AuthorizationRedirect = <Redirect to="/" />
    }

    return (
        <>
            {AuthorizationRedirect}
            <Route
                path="/basicsInfo"
                component={BasicsInfo} />
            <Route
                path="/"
                component={LoginForm}
                exact />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(checkUserAuthentication()),
        buttonLogout: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Content);