import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import Aux from '../../hoc/auxiliary';
import Sidebar from '../sidebar/sidebar';
import Customers from "../customers/customers";
import Documents from "../documents/allDocuments";
import Customer from "../customers/customer";
import FullDocument from "../documents/documentFullDetails";

import { checkUserAuthentication } from '../../store/authorization/authAction';
import { getAccOfficeData } from '../../store/accountingOffice/accOfficeAction'


const Content = (props) => {
    useEffect(() => {
        if (props.officeId !== "none")
            props.getOfficeData(props.officeId);
    }, []);

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
                    <h2>{props.officeData.companyName}</h2>
                    {props.customerName !== "" ? <h3>{props.customerName}</h3> : null}
                    <Route
                        path="/auth/documents/:id"
                        component={Documents}
                        exact
                    />
                    <Route
                        path="/auth/customers"
                        component={Customers}
                    />
                    <Route
                        path="/auth/customer/:id"
                        component={Customer}
                    />
                    <Route
                        path="/auth/documents/:dbId/:id"
                        component={FullDocument}
                    />
                </div>
            </div>
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuthenticated,
        officeId: state.authReducer.dataAccess,
        officeData: state.accOfficeReducer.officeData,
        customerName: state.customerReducer.customer.companyName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(checkUserAuthentication()),
        getOfficeData: (id) => dispatch(getAccOfficeData(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);