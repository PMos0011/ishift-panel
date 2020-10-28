import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from "../../hoc/auxiliary";

import { changeMyData } from "../../store/settings/settingsActions";
import form from "./myDataEditFormBuild";
import {setMessage} from '../../store/alerts/alertsActions';

const MyDataChange = (props) => {

    const [formComponents, setComponents] = useState(form(props.myData));

    const formArray = [];
    for (let key in formComponents) {
        formArray.push({
            id: key,
            formConfig: formComponents[key]
        })
    }

    let inputChangeHandler = (event, inputId) => {

        const updatedForm = {
            ...formComponents
        };

        const updatedElement = {
            ...updatedForm[inputId]
        };

        updatedElement.value = event.target.value;
        updatedForm[inputId] = updatedElement;

        setComponents(updatedForm);
    }

    const submitForm = (event) => {
        event.preventDefault();

        let dataToSend = []

        props.myData.map(data => {

            if (formComponents[data.companyNumber] !== undefined)
                if (formComponents[data.companyNumber].value !== data.companyData) {
                    let newData = {...data};
                    newData.companyData = formComponents[data.companyNumber].value
                    dataToSend.push(
                        newData
                    )
                }
        }
        )
        if (dataToSend.length < 1)
            props.setMessage("Nie ma żadnych zmian do wysłania", true);
        else {
            props.onSubmit(
                dataToSend,
                props.dataAccess
            );
        }
    }

    return (
            <div className=" form-white-background app-border-shadow">
                <form onSubmit={submitForm}>
                    <div className="doc-grid-2-auto-container full-width doc-grid-fill">
                        {formArray.map((component) => {
                            return (
                                <Aux key={component.id}>
                                    <label>{component.formConfig.labelDesc}</label>
                                    <input {...component.formConfig.elemConf}
                                        value={component.formConfig.value}
                                        onChange={(event) => inputChangeHandler(event, component.id)}
                                    /></Aux>
                            )
                        })
                        }
                    </div>
                </form>
            </div>
    )
};

const mapStateToProps = (state) => {
    return {
        myData: state.customersReducer.customer.companyData,
        dataAccess:state.authReducer.dataAccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (data, dataAccess) => dispatch(changeMyData(data, dataAccess)),
        setMessage: (message, isError) => dispatch(setMessage(message, isError))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDataChange);