import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aux from "../../hoc/auxiliary";
import { withAlert } from 'react-alert'

import { saveBankAccount } from "../../store/bankAccounts/bankActions";
import form, { newBankAccountObject } from "./bankAccountEditFormBuilder";

const MyBankAccounts = (props) => {

    useEffect(() => {
        if (props.errorMessage !== "")
            if (props.isErrorAlert)
                props.alert.error(props.errorMessage);
            else
                props.alert.success(props.errorMessage);
    });

    let bankAccountData = props.myAccounts.find(acc => acc.id == props.match.params.id)

    if (bankAccountData === undefined)
        bankAccountData = newBankAccountObject;

    const [bankaccountData, setComponents] = useState(bankAccountData);
    const [redirect, setRedirect] = useState(false);

    let redirectToAccounts = null;
    if (redirect)
        redirectToAccounts = <Redirect to={"/auth/bankAccounts/" + props.match.params.dbId} />


    let inputChangeHandler = (event, inputId) => {

        let updatedForm = {
            ...bankaccountData
        };

        let updatedElement = updatedForm[inputId];

        updatedElement = event.target.value;
        updatedForm[inputId] = updatedElement;

        setComponents(updatedForm);
    }

    const submitForm = (event) => {
        event.preventDefault();
        
        props.onSubmit(
            bankaccountData,
            props.dataAccess
        );
setRedirect(true);
    }


    return (
        <div className=" form-white-background app-border-shadow">
            {redirectToAccounts}
            <form onSubmit={submitForm}>
                <div className="doc-grid-2-auto-container doc-grid-fill">
                    {form(bankaccountData).map(formInput => {
                        return (
                            <Aux key={formInput.id}>
                                <label>{formInput.label}</label>
                                <input {...formInput.elemConf}
                                    value={formInput.value}
                                    onChange={(event) => inputChangeHandler(event, formInput.id)}
                                /></Aux>
                        )
                    })}
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorReducer.errorMessage,
        isErrorAlert: state.errorReducer.errorAlert,
        myAccounts: state.bankReducer.bankAccounts,
        dataAccess: state.authReducer.dataAccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (data, access) => dispatch(saveBankAccount(data, access)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(MyBankAccounts));