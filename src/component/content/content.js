import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Aux from '../../hoc/auxiliary';
import Sidebar from '../sidebar/sidebar';
import Customers from "../customers/customers";
import Documents from "../documents/allDocuments";

import { checkUserAuthentication } from '../../store/authorization/authAction';

import '../style.css';

const Content = (props) => {

    props.onLoad();
    let AuthorizationRedirect = null;

    if (!props.isAuth) {
        AuthorizationRedirect = <Redirect to="/" />
    }

    return (
        <Aux>
            {AuthorizationRedirect}
            <div className="flex">
                <Sidebar />
                <div className="width-85">
                    <h2>MB Biuro Usług Księgowych</h2>
                    <Route
                        path="/auth/documents/:id"
                        component={Documents}
                        />
                    <Route
                        path="/auth/customers"
                        component={Customers}
                        />
                </div>
            </div>
        </Aux>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);