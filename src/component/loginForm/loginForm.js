import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { withAlert } from 'react-alert'

import { connect } from "react-redux";
import Aux from '../../hoc/auxiliary';
import * as actions from '../../store/authorization/authAction';

import form from './loginFormBuild';

const LoginForm = (props) => {

    useEffect(() => {
        if (props.errorMessage !== "")
        if (props.isErrorAlert)
            props.alert.error(props.errorMessage);
        else
            props.alert.success(props.errorMessage);
    });

    let redirectToBasicsInfo = null;


    if (props.isAuth) {
        if (props.isAdmin)
            redirectToBasicsInfo = <Redirect to="/auth/customers" />
        else {
            const customerLink = "/auth/customer/" + props.dataAccess;
            redirectToBasicsInfo = <Redirect to={customerLink} />
        }

    }
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
        setComponents(updatedLoginForm);
    }


    const submitForm = (event) => {
        event.preventDefault();

        if (formComponents.userName.value === "")
            props.alert.error("Nazwa użytkownika nie może byc pusta!");
        else if (formComponents.password.value === "")
            props.alert.error("Hasło nie może byc puste!");
        else
            props.onSubmit(formComponents.userName.value,
                formComponents.password.value);
    }

    return (
        <Aux>
            <div className="gray-card flex-center app-border-shadow">
                {redirectToBasicsInfo}
                <form className="text-x-large-input" onSubmit={submitForm}>
                    <div>
                        {formArray.map((component) => {
                            return (
                                <label key={component.id}>{component.formConfig.labelDesc}
                                    <input  className="text-x-large-input" {...component.formConfig.elemConf}
                                        value={component.formConfig.value}
                                        onChange={(event) => inputChangeHandler(event, component.id)} />
                                </label>
                            )
                        })
                        }
                    </div>
                </form>
            </div>
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuthenticated,
        isAdmin: state.authReducer.isAdmin,
        dataAccess: state.authReducer.dataAccess,
        errorMessage: state.errorReducer.errorMessage,
        isErrorAlert: state.errorReducer.errorAlert,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (name, pass) => dispatch(actions.authorizeUser(name, pass))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(LoginForm));