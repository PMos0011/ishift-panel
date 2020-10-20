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
import Invoice from "../invoices/invoice";
import InvoiceForm from "../invoices/invoiceForm";
import Contractors from "../contractors/contractors";
import Commodities from "../commodity/commodities";

import SubmitForm from "../submitForm";
import bankAccountForm, { newObject as newBankAccountObject } from "../bankAccounts/bankAccountFormBuilder";
import contractorForm, { newObject as newContractorObject } from "../contractors/contractorFormBuilder";
import commodityForm, { newObject as newCommodityObject } from "../commodity/commodityFormBuilder";

import { checkUserAuthentication } from '../../store/authorization/authAction';
import { getAccOfficeData } from '../../store/accountingOffice/accOfficeAction';
import { saveBankAccount } from '../../store/bankAccounts/bankActions';
import { saveContractor } from "../../store/contractors/contractorsActions";
import { saveCommodity } from "../../store/commodity/commodityActions";
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
                        component={
                            (p) => (<SubmitForm {...p}
                                dataToChange={props.bankAccounts}
                                form={bankAccountForm}
                                newObject={newBankAccountObject}
                                redirectTo="/auth/bankAccounts/"
                                onSubmit={props.onBankAccountSubmit}
                            />)
                        }
                    />

                    <Route
                        path="/auth/invoice/:dbId/:id"
                        component={Invoice}
                        exact />

                        <Route
                        path="/auth/invoice/edit/:dbId/:id"
                        component={InvoiceForm} />

                    <Route
                        path="/auth/contractors/:id"
                        component={Contractors}
                        exact />
                    <Route
                        path="/auth/contractors/edit/:dbId/:id"
                        component={
                            (p) => (<SubmitForm {...p}
                                dataToChange={props.contractors}
                                form={contractorForm}
                                newObject={newContractorObject}
                                redirectTo="/auth/contractors/"
                                onSubmit={props.onContractorSubmit}
                            />)
                        }
                    />


                    <Route
                        path="/auth/commodity/:id"
                        component={Commodities}
                        exact />

                         <Route
                        path="/auth/commodity/edit/:dbId/:id"
                        component={
                            (p) => (<SubmitForm {...p}
                                dataToChange={props.commodities}
                                form={commodityForm}
                                newObject={newCommodityObject}
                                redirectTo="/auth/commodity/"
                                onSubmit={props.onCommoditySubmit}
                                selectLabel="Jednostka miary:"
                                selectOptions={props.measures}
                                selectBindValue="measureId"
                            />)
                        }
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
        customer: state.customersReducer.customer,
        bankAccounts: state.bankReducer.bankAccounts,
        contractors: state.contractorsReducer.contractors,
        commodities: state.commodityReducer.commodities,
        measures: state.commodityReducer.measures
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(checkUserAuthentication()),
        getOfficeData: (id) => dispatch(getAccOfficeData(id)),
        getCompanyData: (id) => dispatch(customerActions.getCustomerData(id)),
        onBankAccountSubmit: (data, access) => dispatch(saveBankAccount(data, access)),
        onContractorSubmit: (data, access) => dispatch(saveContractor(data, access)),
        onCommoditySubmit: (data, access) => dispatch(saveCommodity(data, access)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);