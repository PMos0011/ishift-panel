import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aux from "../hoc/auxiliary";
import Select from 'react-select';

const MyBankAccounts = (props) => {

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

    let selector = null;

    if (props.withSelect !== undefined) {

        let measureOption = null;
        let vateOption = null;
        if (object.id !== "") {
            measureOption = props.measures.find(m => m.label === object.measure)
            vateOption = props.vatTypes.find(v => v.label == object.vatAmount)
        }

        selector =
            <Aux>
                <label>Stawka VAT [%]</label>
                <Select
                    className="margin-top-1"
                    placeholder="Wybierz stawkę"
                    defaultValue={vateOption}
                    options={props.vatTypes}
                    name="vatAmount"
                    onChange={(data, name) => inputChangeHandler(data.label, name.name)} />
                <label>Jednostka miary</label>
                <Select
                    className="margin-top-1"
                    placeholder="Wybierz jednostkę"
                    defaultValue={measureOption}
                    options={props.measures}
                    name="measure"
                    onChange={(data, name) => inputChangeHandler(data.label, name.name)} />
            </Aux>
    }


    return (
        <div className=" form-white-background app-border-shadow">
            {props.match.params.dbId!=="demo"? redirectTo:null}
            <form onSubmit={submitForm}>
                <div className="doc-grid-2-auto-container full-width doc-grid-fill">
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
                    {selector}
                    <label /><input type="submit" value="wyślij" />
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        measures: state.commodityReducer.measures,
        vatTypes: state.invoiceReducer.vatTypes

    };
};

export default connect(mapStateToProps)(MyBankAccounts);