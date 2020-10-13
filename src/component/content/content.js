import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import Aux from '../../hoc/auxiliary';
import Sidebar from '../sidebar/sidebar';
import Customers from "../customers/customers";
import Documents from "../documents/allDocuments";
import Customer from "../customers/customer";
import FullDocument from "../documents/documentFullDetails";
import PasswordChange from "../settings/passwordChange";
import MyDataChanger from "../settings/myDataEdit";
import MyBankAccounts from "../bankAccounts/bankAccounts";
import MyAccountEdit from "../bankAccounts/bankAccountsEdit";

import { checkUserAuthentication } from '../../store/authorization/authAction';
import { getAccOfficeData } from '../../store/accountingOffice/accOfficeAction';
import * as customerActions from '../../store/customers/customersActions';


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
                    {props.customerName !== "" ? <h3>{props.customer.companyName}</h3> : null}
                    <Route
                        path="/auth/documents/:id"
                        component={Documents}
                        exact
                    />
                    <Route
                        path="/auth/bankAccounts/:id"
                        component={MyBankAccounts}
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
                    <Route
                        path="/auth/settings/data"
                        component={MyDataChanger}
                    />
                    <Route
                        path="/auth/settings/pass"
                        component={PasswordChange}
                    />
                    <Route
                        path="/auth/bankAccounts/edit/:dbId/:id"
                        component={MyAccountEdit} />
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
        customer: state.customersReducer.customer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(checkUserAuthentication()),
        getOfficeData: (id) => dispatch(getAccOfficeData(id)),
        getCompanyData: (id) => dispatch(customerActions.getCustomerData(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);