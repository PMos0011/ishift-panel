import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import * as actions from '../../store/authorization/authAction';
import { setMessage } from '../../store/alerts/alertsActions';

import form from './loginFormBuild';

const LoginForm = (props) => {

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

        if(event.target.name==="demo"){
            formComponents.userName.value="demo";
            formComponents.password.value="demo";
        }

        if (formComponents.userName.value === "")
            props.setMessage("Nazwa użytkownika nie może byc pusta!", true);
        else if (formComponents.password.value === "")
            props.setMessage("Hasło nie może byc puste!", true);
        else
            props.onSubmit(formComponents.userName.value,
                formComponents.password.value);
    }

    return (
            <div className="gray-card flex-center app-border-shadow">
                {redirectToBasicsInfo}
                <form className="text-x-large-input" onSubmit={submitForm}>
                    <div>
                        {formArray.map((component) => {
                            return (
                                <label key={component.id}>{component.formConfig.labelDesc}
                                    <input {...component.formConfig.elemConf}
                                        value={component.formConfig.value}
                                        onClick={component.formConfig.submit ? submitForm : null}
                                        onChange={component.formConfig.submit ? null : event => inputChangeHandler(event, component.id)} />
                                </label>
                            )
                        })
                        }
                    </div>
                </form>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuthenticated,
        isAdmin: state.authReducer.isAdmin,
        dataAccess: state.authReducer.dataAccess,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (name, pass) => dispatch(actions.authorizeUser(name, pass)),
        setMessage: (message, isError) => dispatch(setMessage(message, isError))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);