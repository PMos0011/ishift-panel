import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Aux from "../../hoc/auxiliary";

import { withAlert } from 'react-alert'

import { changeAccessData } from "../../store/settings/settingsActions";
import form from "./passwordChangeBaseBuild";

const PassChange = (props) => {

    useEffect(() => {
        if (props.errorMessage !== "")
        if (props.isErrorAlert)
            props.alert.error(props.errorMessage);
        else
            props.alert.success(props.errorMessage);
    });


    const [formComponents, setComponents] = useState(form);

    const formArray = [];
    for (let key in formComponents) {
        formArray.push({
            id: key,
            formConfig: formComponents[key]
        })
    }

    let inputChangeHandler = (event, inputName) => {

        const updatedLoginForm = {
            ...formComponents
        };
        const updatedElement = {
            ...updatedLoginForm[inputName]
        };

        updatedElement.value = event.target.value;
        updatedLoginForm[inputName] = updatedElement;

        if (inputName === "newPassword" || inputName === "newPasswordConfirm")
            if (updatedLoginForm.newPassword.value !== updatedLoginForm.newPasswordConfirm.value) {
                updatedLoginForm.newPasswordConfirm.secLebel = "hasła muszą być jednakowe";
                updatedLoginForm.newPasswordConfirm.redLabel = true;
            } else {
                updatedLoginForm.newPasswordConfirm.secLebel = " ";
                updatedLoginForm.newPasswordConfirm.redLabel = false;
            }


        setComponents(updatedLoginForm);
    }


    const submitForm = (event) => {
        event.preventDefault();

        if (formComponents.password.value === "") {

            props.alert.error("Hasło nie może byc puste!");

            const updatedLoginForm = {
                ...formComponents
            };

            updatedLoginForm.password.secLebel = "To pole nie może byc puste";
            updatedLoginForm.password.redLabel = true;

            setComponents(updatedLoginForm);

        } else if (formComponents.newPassword.value !== formComponents.newPasswordConfirm.value)
            props.alert.error("pola nowego hasła nie są jednakowe");

        else if (formComponents.newPassword.value === "" && formComponents.userName.value === "")
            props.alert.error("Nie mam co zmienić. Login i hasło są puste");

        else {
            props.onSubmit(
                formComponents.userName.value,
                formComponents.newPassword.value,
                formComponents.password.value
            );
        }
    }

    return (
        <Aux>
            <div className=" form-white-background app-border-shadow">
                <form className="text-x-large-input" onSubmit={submitForm}>
                    <div>
                        {formArray.map((component) => {
                            return (
                                <label key={component.id}>{component.formConfig.labelDesc}
                                    <input className="text-x-large-input" {...component.formConfig.elemConf}
                                        value={component.formConfig.value}
                                        onChange={(event) => inputChangeHandler(event, component.id)} />
                                    <label className={component.formConfig.redLabel ? "sec-label red-label" : "sec-label"}>{component.formConfig.secLebel}</label>
                                </label>
                            )
                        })
                        }
                    </div>
                </form>
            </div>
        </Aux>
    )
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorReducer.errorMessage,
        isErrorAlert: state.errorReducer.errorAlert,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (newlogin, newPassword, oldPassword) => dispatch(changeAccessData(newlogin, newPassword, oldPassword)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(PassChange));