import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aux from "../hoc/auxiliary";
import { withAlert } from 'react-alert'
import Select from 'react-select';

const MyBankAccounts = (props) => {

    useEffect(() => {
        if (props.errorMessage !== "")
            if (props.isErrorAlert)
                props.alert.error(props.errorMessage);
            else
                props.alert.success(props.errorMessage);
    });

    let object = props.dataToChange.find(obj => obj.id == props.match.params.id)

    if (object === undefined)
        object = props.newObject;

    const [formObject, setComponents] = useState(object);
    const [redirect, setRedirect] = useState(false);

    let redirectTo = null;
    if (redirect)
        redirectTo = <Redirect to={props.redirectTo + props.match.params.dbId} />


    let inputChangeHandler = (value, inputId) => {

        let updatedForm = {
            ...formObject
        };

        let updatedElement = updatedForm[inputId];

        updatedElement = value;
        updatedForm[inputId] = updatedElement;

        setComponents(updatedForm);
    }

    const submitForm = (event) => {
        event.preventDefault();

        props.onSubmit(
            formObject,
            props.match.params.dbId
        );
        setRedirect(true);
    }

    const setSelectorOptions = (data) => {
        inputChangeHandler(data.label,props.selectBindValue);
    }

    const selector =
        <Aux>
            <label>{props.selectLabel}</label>
            <Select
            className="margin-top-1"
                placeholder="Wybierz jednostkę"
                defaultValue={props.selectOptions[0]}
                options={props.selectOptions}
                onChange={setSelectorOptions} />
        </Aux>



    return (
        <div className=" form-white-background app-border-shadow">
            {redirectTo}
            <form onSubmit={submitForm}>
                <div className="doc-grid-2-auto-container doc-grid-fill">
                    {props.form(formObject).map(formInput => {
                        return (
                            <Aux key={formInput.id}>
                                <label>{formInput.label}</label>
                                <input {...formInput.elemConf}
                                    value={formInput.value}
                                    onChange={(event) => inputChangeHandler(event.target.value, formInput.id)}
                                />
                            </Aux>
                        )
                    })}
                    {props.selectLabel !== undefined ? selector : null}
                    <label /><input type="submit" value="wyślij" />
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorReducer.errorMessage,
        isErrorAlert: state.errorReducer.errorAlert,
    };
};

export default connect(mapStateToProps)(withAlert()(MyBankAccounts));